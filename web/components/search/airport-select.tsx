type AirportOption = {
  code: string;
  name: string;
};

export const airportOptions: AirportOption[] = [
  { code: "GRU", name: "São Paulo (Guarulhos)" },
  { code: "GIG", name: "Rio de Janeiro (Galeão)" },
  { code: "BSB", name: "Brasília" },
  { code: "SSA", name: "Salvador" },
  { code: "REC", name: "Recife" },
  { code: "POA", name: "Porto Alegre" },
  { code: "CNF", name: "Belo Horizonte" },
  { code: "FOR", name: "Fortaleza" },
];

type AirportSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
};

export function AirportSelect({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: AirportSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-600">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-base text-slate-800 outline-none transition duration-200 hover:border-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {airportOptions.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.code} • {airport.name}
          </option>
        ))}
      </select>
    </label>
  );
}
