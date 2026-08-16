import { Injectable, Logger } from "@nestjs/common";
import {
  NormalizedQuote,
  SearchInput,
  SupplierAdapter,
} from "../interfaces/supplier.interface";

@Injectable()
export class SupplierAAdapter implements SupplierAdapter {
  readonly name = "Supplier-A";
  private readonly logger = new Logger(SupplierAAdapter.name);

  async fetchQuotes(search: SearchInput): Promise<NormalizedQuote[]> {
    const url = `http://localhost:4000/supplier-a/quotes?origin=${search.origin}&destination=${search.destination}&date=${search.date}`;

    // Parâmetros de Redundância
    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const response = await fetch(url, { signal: search.signal });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data.results) return [];

        return data.results.map((flight: any) => ({
          provider: this.name,
          airline: flight.carrier,
          miles: Number(flight.miles),
          taxBrl: Number(flight.taxes_brl),
        }));
      } catch (error: any) {
        attempt++;

        // Se o erro for de Timeout (AbortError), não fazemos retry, pois o tempo global já esgotou
        if (error.name === "AbortError") {
          this.logger.warn(
            `Request aborted by timeout for ${this.name} (${search.origin}-${search.destination} ${search.date}). No more retries.`,
          );
          throw error;
        }

        // Se ainda temos tentativas, fazemos log de aviso (WARN) e o loop continua
        if (attempt <= maxRetries) {
          this.logger.warn(
            `Attempt ${attempt} failed for ${this.name} (${search.origin}-${search.destination} ${search.date}). Retrying... (${error.message})`,
          );
          continue;
        }

        // Se esgotaram as tentativas, disparamos o erro (ERROR)
        this.logger.error(
          `Exhausted retries for ${this.name} (${search.origin}-${search.destination} ${search.date}). Final error: ${error.message}`,
        );
        throw error;
      }
    }

    return [];
  }
}
