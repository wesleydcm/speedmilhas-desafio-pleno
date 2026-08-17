import { Injectable, Logger } from "@nestjs/common";
import {
  NormalizedQuote,
  SearchInput,
  SupplierAdapter,
} from "../interfaces/supplier.interface";

@Injectable()
export class SupplierBAdapter implements SupplierAdapter {
  readonly name = "Supplier-B";
  private readonly logger = new Logger(SupplierBAdapter.name);

  async fetchQuotes(
    search: SearchInput,
    signal: AbortSignal,
  ): Promise<NormalizedQuote[]> {
    const url = `http://localhost:4000/supplier-b/search?from=${search.origin}&to=${search.destination}&day=${search.date}`;

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        const response = await fetch(url, { signal: signal });

        if (!response.ok) {
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After") || "1";
            // Lançamos um erro específico. Como o tempo de timeout global é muito restrito (5.5s),
            // escolhemos falhar rápido (fail-fast) no rate limit ao invés de ficar travando a thread esperando.
            throw new Error(
              `Rate limit exceeded (429). Retry after ${retryAfter}s`,
            );
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data.dados) return [];

        return data.dados.map((flight: any) => ({
          provider: this.name,
          airline: flight.cia,
          miles: Number(flight.pontos),
          taxBrl: Number(flight.taxa?.valor ?? 0),
        }));
      } catch (error: any) {
        attempt++;

        // Se foi cortado pelo AbortController (timeout), não tenta de novo de jeito nenhum!
        if (error.name === "AbortError") {
          this.logger.warn(
            `Timeout exceeded for ${this.name} (${search.origin}-${search.destination} ${search.date}). No more retries.`,
          );
          throw error;
        }

        // Não fazemos retry para Rate Limit para não piorar o cenário
        const isRateLimit = error.message.includes("429");

        if (isRateLimit || attempt > maxRetries) {
          this.logger.error(
            `Final failure for ${this.name} (${search.origin}-${search.destination} ${search.date}). Reason: ${error.message}`,
          );
          throw error;
        }

        // Faz o retry silencioso para cobrir os 20% de erro 500
        this.logger.warn(
          `Attempt ${attempt} failed for ${this.name}. Retrying... (${error.message})`,
        );
      }
    }

    return [];
  }
}
