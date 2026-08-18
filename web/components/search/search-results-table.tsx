type Quote = {
  provider: "Supplier-A" | "Supplier-B" | "Supplier-C";
  airline: string;
  miles: number;
  taxBrl: number;
};

import { getProviderLabel } from "./provider-labels";

type SearchResultsTableProps = {
  quotes: Quote[];
};

const providerColors: Record<string, string> = {
  "Supplier-A": "bg-sky-100 text-sky-700 ring-sky-200",
  "Supplier-B": "bg-amber-100 text-amber-700 ring-amber-200",
  "Supplier-C": "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

const airlineColors: Record<string, string> = {
  LATAM: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  GOL: "bg-orange-50 text-orange-700 ring-orange-200",
  AZUL: "bg-blue-50 text-blue-700 ring-blue-200",
};

function getAirlineColor(airline: string): string {
  return (
    airlineColors[airline.toUpperCase()] ??
    "bg-slate-100 text-slate-700 ring-slate-200"
  );
}

export function SearchResultsTable({ quotes }: SearchResultsTableProps) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
        Nenhuma opção retornou dos fornecedores disponíveis.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Fornecedor</th>
              <th className="px-4 py-3 font-semibold">Companhia</th>
              <th className="px-4 py-3 font-semibold">Milhas</th>
              <th className="px-4 py-3 font-semibold">Taxa</th>
              <th className="px-4 py-3 text-right font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr
                key={`${quote.provider}-${quote.airline}-${quote.miles}-${index}`}
                className="border-t border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              >
                <td className="px-4 py-4 align-middle">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${providerColors[quote.provider] ?? "bg-slate-100 text-slate-700 ring-slate-200"}`}
                  >
                    {getProviderLabel(quote.provider)}
                  </span>
                </td>
                <td className="px-4 py-4 align-middle">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getAirlineColor(quote.airline)}`}
                  >
                    {quote.airline}
                  </span>
                </td>
                <td className="px-4 py-4 align-middle text-base font-bold text-slate-900">
                  {quote.miles.toLocaleString("pt-BR")} mi
                </td>
                <td className="px-4 py-4 align-middle text-sm font-medium text-slate-700">
                  R$ {quote.taxBrl.toFixed(2).replace(".", ",")}
                </td>
                <td className="px-4 py-4 align-middle text-right">
                  <span className="inline-flex cursor-default select-none rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500">
                    Selecionar
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
