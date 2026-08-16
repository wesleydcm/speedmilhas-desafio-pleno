import { Injectable, Logger } from "@nestjs/common";
import {
  NormalizedQuote,
  SearchInput,
  SupplierAdapter,
} from "../interfaces/supplier.interface";
import { normalizeAirlineName } from "../utils/airline-mapper.util";

@Injectable()
export class SupplierCAdapter implements SupplierAdapter {
  readonly name = "Supplier-C";
  private readonly logger = new Logger(SupplierCAdapter.name);

  async fetchQuotes(search: SearchInput): Promise<NormalizedQuote[]> {
    const url = `http://localhost:4000/supplier-c/v2/quotes`;

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: search.origin,
            destination: search.destination,
            date: search.date,
          }),
          signal: search.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();

        // 🧹 SUJEIRA 1: Payload vazio
        if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
          throw new Error("Dirty payload: empty data array"); // Força o retry
        }

        const results: NormalizedQuote[] = [];

        for (const item of json.data) {
          // 🧹 SUJEIRA 2: Campos nulos
          if (
            item.price_miles == null ||
            item.fee == null ||
            item.airline_code == null
          ) {
            throw new Error("Dirty payload: null field detected"); // Força o retry
          }

          const miles = Number(item.price_miles);
          const taxBrl = Number(item.fee);

          // 🧹 SUJEIRA 3: price_miles ou fee vindo como string suja (ex: NaN)
          if (isNaN(miles) || isNaN(taxBrl)) {
            throw new Error("Dirty payload: invalid number format"); // Força o retry
          }

          results.push({
            provider: this.name,
            airline: normalizeAirlineName(item.airline_code),
            miles: miles,
            taxBrl: taxBrl,
          });
        }

        return results;
      } catch (error: any) {
        attempt++;

        if (error.name === "AbortError") {
          this.logger.warn(
            `Timeout exceeded for ${this.name} (${search.origin}-${search.destination} ${search.date}). No more retries.`,
          );
          throw error; // Timeout já estourou o limite de 5.5s, não tem como fazer retry
        }

        if (attempt > maxRetries) {
          this.logger.error(
            `Final failure for ${this.name} (${search.origin}-${search.destination} ${search.date}). Reason: ${error.message}`,
          );
          throw error;
        }

        this.logger.warn(
          `Attempt ${attempt} failed for ${this.name}. Retrying... (${error.message})`,
        );
      }
    }

    return [];
  }
}
