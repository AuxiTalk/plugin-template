import { callCapability, listCapabilities } from "./capabilities.js";
import { log } from "./logger.js";
import type { PluginManifest, JsonObject, JsonValue } from "./types.js";
import { RpcPeer } from "./rpc.js";

export class PluginRuntime {
  constructor(
    private manifest: PluginManifest,
    private peer: RpcPeer,
  ) {}

  registerHandlers(): void {
    this.peer.on("plugin.handshake", () => this.handshake());
    this.peer.on("plugin.start", () => this.start());
    this.peer.on("plugin.stop", () => this.stop());
    this.peer.on("plugin.health", () => this.health());
    this.peer.on("capability.call", (params) => this.capabilityCall(params));
  }

  async listen(): Promise<void> {
    this.registerHandlers();
    log("plugin ready", { id: this.manifest.id });
    await this.peer.listen();
  }

  private handshake(): JsonObject {
    return {
      pluginId: this.manifest.id,
      protocolVersion: "0.1",
      capabilities: this.manifest.capabilities?.map((capability) => capability.name) ?? [],
    };
  }

  private start(): JsonObject {
    log("plugin started", { id: this.manifest.id });
    return { started: true };
  }

  private stop(): JsonObject {
    log("plugin stopped", { id: this.manifest.id });
    process.exitCode = 0;
    return { stopped: true };
  }

  private health(): JsonObject {
    return {
      ok: true,
      pluginId: this.manifest.id,
      capabilities: listCapabilities(),
    };
  }

  private async capabilityCall(params: JsonValue | undefined): Promise<JsonValue> {
    if (!isObject(params) || typeof params.name !== "string") {
      throw new Error("capability.call requires params.name");
    }

    return callCapability(params.name, params.input);
  }
}

function isObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
