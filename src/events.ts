import type { JsonObject } from "./types.js";
import { RpcPeer } from "./rpc.js";

export async function emitEvent(peer: RpcPeer, event: JsonObject): Promise<void> {
  await peer.request("event.emit", event);
}
