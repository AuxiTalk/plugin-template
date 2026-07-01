import type { CapabilityHandler, JsonValue } from "./types.js";

const handlers = new Map<string, CapabilityHandler>();

export function registerCapability(name: string, handler: CapabilityHandler): void {
  handlers.set(name, handler);
}

export async function callCapability(name: string, input: JsonValue | undefined): Promise<JsonValue> {
  const handler = handlers.get(name);
  if (!handler) throw new Error(`capability not found: ${name}`);
  return handler(input);
}

export function listCapabilities(): string[] {
  return [...handlers.keys()].sort();
}

registerCapability("example.ping", async (input) => {
  return {
    pong: true,
    input: input ?? null,
  };
});
