export type SupplierName = "Supplier-A" | "Supplier-B" | "Supplier-C";

export type SearchInput = {
  origin: string;
  destination: string;
  date: string;
  signal: AbortSignal;
};

export interface NormalizedQuote {
  provider: SupplierName;
  airline: string;
  miles: number;
  taxBrl: number;
}

export interface SupplierAdapter {
  readonly name: SupplierName;
  fetchQuotes(search: SearchInput): Promise<NormalizedQuote[]>;
}
