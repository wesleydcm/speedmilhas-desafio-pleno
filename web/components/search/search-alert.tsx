import type { SearchResponse, SearchStatus } from "@/hooks/use-search-flights";

type SearchAlertProps = {
  status: SearchStatus;
  result: SearchResponse | null;
  errorMessage: string;
};

export function SearchAlert({
  status,
  result,
  errorMessage,
}: SearchAlertProps) {
  if (status === "idle") {
    return (
      <div className="rounded-[26px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
        <p className="text-lg font-medium text-slate-700">
          Informe origem, destino e data para consultar os fornecedores.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Consultamos Supplier-A, Supplier-B e Supplier-C em paralelo.
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="rounded-3xl border border-sky-200 bg-sky-50 p-4 text-sky-900 shadow-[0_10px_30px_rgba(14,116,144,0.08)]">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-500" />
          <p className="font-medium">
            Consultando fornecedores e montando as melhores opções...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700 shadow-[0_10px_30px_rgba(190,24,93,0.08)]">
        <p className="font-semibold">Não foi possível completar a busca.</p>
        <p className="mt-1 text-sm text-rose-600">{errorMessage}</p>
      </div>
    );
  }

  if (status === "partial" && result) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-[0_10px_30px_rgba(245,158,11,0.08)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Resultado parcial
            </p>
            <p className="mt-1 text-sm text-amber-900">
              Encontramos {result.data.length} opção(ões) de{" "}
              {result.metadata.total}. Alguns fornecedores não responderam a
              tempo.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
            {result.metadata.failedProviders.length} fornecedor(es) fora
          </span>
        </div>
      </div>
    );
  }

  return null;
}
