const airlineMap: Record<string, string> = {
  LA: "LATAM",
  G3: "GOL",
  AD: "AZUL",
};

export function normalizeAirlineName(codeOrName: string): string {
  if (!codeOrName) return "UNKNOWN";

  const normalizedInput = codeOrName.trim().toUpperCase();

  return airlineMap[normalizedInput] || normalizedInput;
}
