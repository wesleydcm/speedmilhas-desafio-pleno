import { AirportSelect } from "./airport-select";
import { DateField } from "./date-field";

type FormValues = {
  origin: string;
  destination: string;
  date: string;
};

type SearchPanelProps = {
  form: FormValues;
  onFieldChange: (field: keyof FormValues, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const today = new Date().toISOString().split("T")[0];

export function SearchPanel({
  form,
  onFieldChange,
  onSubmit,
  isLoading,
}: SearchPanelProps) {
  return (
    <section className="rounded-[26px] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-5">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <AirportSelect
          label="Origem"
          value={form.origin}
          onChange={(value) => onFieldChange("origin", value)}
          placeholder="Selecione a origem"
        />

        <AirportSelect
          label="Destino"
          value={form.destination}
          onChange={(value) => onFieldChange("destination", value)}
          placeholder="Selecione o destino"
        />

        <DateField
          label="Data"
          value={form.date}
          min={today}
          onChange={(value) => onFieldChange("date", value)}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={
            isLoading || !form.origin || !form.destination || !form.date
          }
          className="self-end cursor-pointer rounded-2xl bg-[linear-gradient(135deg,#0d4eb7_0%,#0f7ae7_100%)] px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_25px_rgba(13,78,183,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isLoading ? "Buscando..." : "Buscar voos"}
        </button>
      </form>
    </section>
  );
}
