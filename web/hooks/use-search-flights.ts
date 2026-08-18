import { FormEvent, useCallback, useState } from "react";

export type Quote = {
  provider: "Supplier-A" | "Supplier-B" | "Supplier-C";
  airline: string;
  miles: number;
  taxBrl: number;
};

export type SearchResponse = {
  partial: boolean;
  metadata: {
    total: number;
    failedProviders: string[];
  };
  data: Quote[];
};

export type SearchStatus = "idle" | "loading" | "success" | "partial" | "error";

export const initialForm = {
  origin: "GRU",
  destination: "GIG",
  date: "2026-08-20",
};

export function useSearchFlights() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<SearchResponse | null>(null);

  const updateField = useCallback(
    (field: keyof typeof initialForm, value: string) => {
      setForm((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  const submit = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      setStatus("loading");
      setErrorMessage("");
      setResult(null);

      try {
        const response = await fetch("http://localhost:3000/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: form.origin,
            destination: form.destination,
            date: form.date,
          }),
        });

        if (!response.ok) {
          const payload = await response.text();
          throw new Error(payload || "Não foi possível buscar voos.");
        }

        const payload: SearchResponse = await response.json();
        setResult(payload);
        setStatus(payload.partial ? "partial" : "success");
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Erro inesperado ao consultar os fornecedores.",
        );
        setStatus("error");
      }
    },
    [form],
  );

  return {
    form,
    status,
    errorMessage,
    result,
    updateField,
    submit,
  };
}
