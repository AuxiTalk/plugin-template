export function log(message: string, data?: unknown): void {
  const suffix = data === undefined ? "" : ` ${JSON.stringify(data)}`;
  process.stderr.write(`[auxitalk-plugin] ${message}${suffix}\n`);
}
