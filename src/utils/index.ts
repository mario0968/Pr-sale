export function formatNumber(num: number | bigint) {
  if (!num) return "0";
  return Number(num).toLocaleString("en", {
    maximumFractionDigits: 1,
    maximumSignificantDigits: 3,
    notation: "compact",
  });
}
