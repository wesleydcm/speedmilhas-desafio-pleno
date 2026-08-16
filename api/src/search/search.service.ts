import { Injectable } from "@nestjs/common";
import { SupplierAAdapter } from "src/suppliers/adapters/supplier-a.adapter";
import { SupplierBAdapter } from "src/suppliers/adapters/supplier-b.adapter";

@Injectable()
export class SearchService {
  constructor(
    private readonly supplierA: SupplierAAdapter,
    private readonly supplierB: SupplierBAdapter,
  ) {}

  async search(origin: string, destination: string, date: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 5500);

    const tasks = [
      this.supplierA.fetchQuotes({ origin, destination, date, signal }),
      this.supplierB.fetchQuotes({ origin, destination, date, signal }),
    ];

    const results = await Promise.allSettled(tasks);
    clearTimeout(timeoutId);

    const quotes = results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : [],
    );

    const providers = [
      {
        name: this.supplierA.name,
        status: results[0].status === "fulfilled" ? "ok" : "failed",
      },
      {
        name: this.supplierB.name,
        status: results[1].status === "fulfilled" ? "ok" : "failed",
      },
    ];

    return {
      partial: providers.some((p) => p.status === "failed"),
      quotes: quotes.sort((a, b) => a.miles - b.miles),
      providers,
    };
  }
}
