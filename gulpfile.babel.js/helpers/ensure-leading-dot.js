export default function ensureLeadingDot(string) {
  return string.indexOf('.') === 0 ? string : `.${string}`
}