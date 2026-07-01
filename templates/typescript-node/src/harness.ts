import { PassThrough } from "node:stream";
import type { JsonRpcRequest } from "./types.js";
import { RpcPeer } from "./rpc.js";

export type ProtocolHarness = {
  peer: RpcPeer;
  input: PassThrough;
  output: PassThrough;
  send: (request: JsonRpcRequest) => void;
  close: () => void;
  readRaw: () => string;
  readMessages: () => unknown[];
};

export function createProtocolHarness(): ProtocolHarness {
  const input = new PassThrough();
  const output = new PassThrough();
  const chunks: string[] = [];
  const peer = new RpcPeer(input, output);

  output.on("data", (chunk) => chunks.push(String(chunk)));

  return {
    peer,
    input,
    output,
    send(request) {
      input.write(`${JSON.stringify(request)}\n`);
    },
    close() {
      input.end();
    },
    readRaw() {
      return chunks.join("");
    },
    readMessages() {
      return chunks
        .join("")
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line) as unknown);
    },
  };
}
