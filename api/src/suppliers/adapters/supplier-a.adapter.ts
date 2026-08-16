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

    try {
      const response = await fetch(url, { signal: search.signal });
      if (!response.ok)
        throw new Error(`supplier-a failed HTTP ${response.status}`);

      const data = await response.json();
      if (!data.results) return [];

      return data.results.map((flight: any) => ({
        provider: this.name,
        airline: flight.carrier,
        miles: flight.miles,
        taxBrl: flight.taxes_brl,
      }));
    } catch (error: any) {
      this.logger.error(`Falha ao buscar voos: ${error.message}`);
      throw error;
    }
  }
}
