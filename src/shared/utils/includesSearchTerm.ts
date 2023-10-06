export function includeIgnoreCase(text: string, searchTerm: string) {
  return text?.toLocaleLowerCase()?.includes(searchTerm?.toLocaleLowerCase());
}
