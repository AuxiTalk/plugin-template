import { PassThrough } from "node:stream";
import { describe, expect, it } from "vitest";
import { RpcPeer } from "../src/rpc.js";

describe("RpcPeer", () => {
  it("handles a registered method", async () => {
    const input = new PassThrough();
    const output = new PassThrough();
    const chunks: string[] = [];

    output.on("data", (chunk) => chunks.push(String(chunk)));

    const peer = new RpcPeer(input, output);
    peer.on("example.ping", () => ({ pong: true }));

    const listening = peer.listen();
    input.write('{"jsonrpc":"2.0","id":"1","method":"example.ping"}\n');
    input.end();
    await listening;

    expect(chunks.join("")).toBe('{"jsonrpc":"2.0","id":"1","result":{"pong":true}}\n');
  });
});
