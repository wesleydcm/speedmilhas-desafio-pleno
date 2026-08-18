import { BrandMark } from "@/components/brand-mark";

export function SearchHeader() {
  return (
    <header className="theme-brand-gradient theme-brand-shadow w-full px-4 py-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <BrandMark />
        <div className="flex flex-col items-baseline gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-100/90">
            Speed Milhas
          </span>
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Busca de voos com milhas
          </h1>
        </div>
      </div>
    </header>
  );
}
