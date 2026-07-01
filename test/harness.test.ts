import { describe, expect, it } from "vitest";
import { createProtocolHarness } from "../src/harness.js";

describe("protocol harness", () => {
  it("simulates core requests", async () => {
    const harness = createProtocolHarness();
    harness.peer.on("example.ping", () => ({ pong: true }));

    const listening = harness.peer.listen();
    harness.send({ jsonrpc: "2.0", id: "1", method: "example.ping" });
    harness.close();
    await listening;

    expect(harness.readMessages()).toEqual([
      { jsonrpc: "2.0", id: "1", result: { pong: true } },
    ]);
  });
});
