import { NormalizedQuote } from "src/suppliers/interfaces/supplier.interface";

export interface SearchResponse {
  partial: boolean;
  metadata: {
    total: number;
    failedProviders: string[];
  };
  data: NormalizedQuote[];
}
