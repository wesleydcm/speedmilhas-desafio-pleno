import { Injectable } from "@nestjs/common";
import { SupplierAAdapter } from "src/suppliers/adapters/supplier-a.adapter";
import { SupplierBAdapter } from "src/suppliers/adapters/supplier-b.adapter";
import { SupplierCAdapter } from "src/suppliers/adapters/supplier-c.adapter";
import { SearchResponse } from "./interfaces/search-response.interface";
import {
  NormalizedQuote,
  SearchInput,
} from "src/suppliers/interfaces/supplier.interface";

@Injectable()
export class SearchService {
  constructor(
    private readonly supplierA: SupplierAAdapter,
    private readonly supplierB: SupplierBAdapter,
    private readonly supplierC: SupplierCAdapter,
  ) {}

  async search(
    origin: string,
    destination: string,
    date: string,
  ): Promise<SearchResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    const SEARCH_DEADLINE_MS = 5700;
    const timeoutId = setTimeout(() => controller.abort(), SEARCH_DEADLINE_MS);

    const searchInput: SearchInput = { origin, destination, date };

    const tasks = [
      this.supplierA.fetchQuotes(searchInput, signal),
      this.supplierB.fetchQuotes(searchInput, signal),
      this.supplierC.fetchQuotes(searchInput, signal),
    ];

    const results = await Promise.allSettled(tasks);
    clearTimeout(timeoutId);

    const flights: NormalizedQuote[] = [];
    const failedProviders: string[] = [];
    const providers = [
      this.supplierA.name,
      this.supplierB.name,
      this.supplierC.name,
    ];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        flights.push(...result.value);
      } else {
        failedProviders.push(providers[index]);
      }
    });

    flights.sort((a, b) => a.miles - b.miles);

    return {
      partial: failedProviders.length > 0,
      metadata: {
        total: flights.length,
        failedProviders,
      },
      data: flights,
    };
  }
}
