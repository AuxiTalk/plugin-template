import { randomUUID } from "node:crypto";
import type { JsonObject, JsonValue } from "./types.js";
import { RpcPeer } from "./rpc.js";

export async function emitEvent(peer: RpcPeer, event: JsonObject): Promise<void> {
  await peer.request("event.emit", event);
}

export async function requestAction(peer: RpcPeer, action: JsonObject): Promise<void> {
  await peer.request("action.request", action);
}

export async function queryMemory(peer: RpcPeer, query: JsonObject): Promise<void> {
  await peer.request("memory.query", query);
}

export async function writeMemory(peer: RpcPeer, entry: JsonObject): Promise<void> {
  await peer.request("memory.write", entry);
}

export async function callAI(peer: RpcPeer, input: JsonValue): Promise<void> {
  await peer.request("ai.complete", input);
}

export function createEvent(type: string, source: string, payload?: JsonObject): JsonObject {
  return {
    id: randomUUID(),
    type,
    source,
    payload: payload ?? {},
    createdAt: new Date().toISOString(),
  };
}
