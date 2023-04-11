export function extractQueryParams(query?: string): Map<string, string> {
  const queryParams = new Map<string, string>();

  if (!query) return queryParams;

  query
    .substring(1)
    .split("&")
    .forEach((param) => {
      const [key, value] = param.split("=");

      queryParams.set(key, value);
    });

  return queryParams;
}
