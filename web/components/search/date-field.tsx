type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  disabled?: boolean;
};

export function DateField({
  label,
  value,
  onChange,
  min,
  disabled = false,
}: DateFieldProps) {
  return (
    <label className="flex cursor-pointer flex-col gap-2 text-sm text-slate-600">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-base text-slate-800 outline-none transition duration-200 hover:border-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}
