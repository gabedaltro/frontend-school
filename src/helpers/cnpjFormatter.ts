export function cnpjFormatter(value?: string): string {
  if (!value) return '';

  value = value.replace(/\D/g, '');
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
}
