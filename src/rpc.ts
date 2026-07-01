import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline";
import type { JsonRpcRequest, JsonRpcResponse, JsonValue } from "./types.js";

export const JsonRpcErrorCode = {
  ParseError: -32700,
  InvalidRequest: -32600,
  MethodNotFound: -32601,
  InvalidParams: -32602,
  InternalError: -32603,
} as const;

export type RpcHandler = (params: JsonValue | undefined, request: JsonRpcRequest) => Promise<JsonValue> | JsonValue;

export class RpcPeer {
  private handlers = new Map<string, RpcHandler>();

  constructor(
    private input: NodeJS.ReadableStream = process.stdin,
    private output: NodeJS.WritableStream = process.stdout,
  ) {}

  on(method: string, handler: RpcHandler): void {
    this.handlers.set(method, handler);
  }

  async listen(): Promise<void> {
    const rl = createInterface({ input: this.input, crlfDelay: Infinity });

    for await (const line of rl) {
      if (!line.trim()) continue;
      await this.handleLine(line);
    }
  }

  async request(method: string, params?: JsonValue, id = randomUUID()): Promise<void> {
    this.write({ jsonrpc: "2.0", id, method, params });
  }

  private async handleLine(line: string): Promise<void> {
    let request: JsonRpcRequest;

    try {
      request = JSON.parse(line) as JsonRpcRequest;
    } catch {
      this.writeError("", JsonRpcErrorCode.ParseError, "parse error");
      return;
    }

    if (request.jsonrpc !== "2.0" || !request.method) {
      this.writeError(request.id ?? "", JsonRpcErrorCode.InvalidRequest, "invalid request");
      return;
    }

    const handler = this.handlers.get(request.method);
    if (!handler) {
      this.writeError(request.id ?? "", JsonRpcErrorCode.MethodNotFound, "method not found");
      return;
    }

    try {
      const result = await handler(request.params, request);
      if (request.id) this.write({ jsonrpc: "2.0", id: request.id, result });
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal error";
      this.writeError(request.id ?? "", JsonRpcErrorCode.InternalError, message);
    }
  }

  private writeError(id: string, code: number, message: string): void {
    this.write({ jsonrpc: "2.0", id, error: { code, message } });
  }

  private write(message: JsonRpcRequest | JsonRpcResponse): void {
    this.output.write(`${JSON.stringify(message)}\n`);
  }
}
