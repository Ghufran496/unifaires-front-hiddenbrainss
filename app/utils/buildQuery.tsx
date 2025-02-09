export const buildQuery = (params: { [key: string]: any }) => {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map(
            (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
          )
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return query ? `?${query}` : "";
  // return query ? `${query}` : "";
};
