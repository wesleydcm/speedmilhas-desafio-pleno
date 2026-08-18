"use client";

import { useMemo } from "react";
import { SearchAlert } from "@/components/search/search-alert";
import { SearchHeader } from "@/components/search/search-header";
import { SearchPanel } from "@/components/search/search-panel";
import { SearchResultsTable } from "@/components/search/search-results-table";
import { useSearchFlights } from "@/hooks/use-search-flights";

export default function Home() {
  const { form, status, errorMessage, result, updateField, submit } =
    useSearchFlights();

  const summaryText = useMemo(() => {
    if (!result) return "";

    if (result.partial) {
      return `Resultados parciais: ${result.data.length} opção(ões) disponíveis de ${result.metadata.total}. Alguns fornecedores falharam.`;
    }

    return `Encontramos ${result.data.length} opção(ões) disponíveis.`;
  }, [result]);

  return (
    <main className="min-h-screen bg-[#eef3f7] px-0 py-0 text-slate-800">
      <SearchHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <section className="rounded-[30px] border border-slate-200 bg-white/70 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-6">
          <SearchPanel
            form={form}
            onFieldChange={updateField}
            onSubmit={submit}
            isLoading={status === "loading"}
          />
        </section>

        <section className="mt-6">
          <SearchAlert
            status={status}
            result={result}
            errorMessage={errorMessage}
          />

          {(status === "success" || status === "partial") && result && (
            <div className="mt-6 space-y-4 rounded-[30px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-800">
                  {summaryText}
                </h2>
                <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {result.data.length} cotação(ões)
                </span>
              </div>

              <SearchResultsTable quotes={result.data} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
