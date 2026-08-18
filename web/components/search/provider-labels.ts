const providerLabels: Record<string, string> = {
  "Supplier-A": "Parceiro de emissao 1",
  "Supplier-B": "Parceiro de emissao 2",
  "Supplier-C": "Parceiro de emissao 3",
};

export function getProviderLabel(provider: string): string {
  return providerLabels[provider] ?? provider;
}
