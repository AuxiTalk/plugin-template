export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: string;
  method: string;
  params?: JsonValue;
};

export type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: string;
  result?: JsonValue;
  error?: JsonRpcError;
};

export type JsonRpcError = {
  code: number;
  message: string;
  data?: JsonValue;
};

export type CapabilityHandler = (input: JsonValue | undefined) => Promise<JsonValue> | JsonValue;

export type PluginCapability = {
  name: string;
  inputSchema?: JsonObject;
  outputSchema?: JsonObject;
};

export type PluginManifest = {
  id: string;
  name: string;
  version: string;
  runtime: string;
  entry: string;
  kind: "input" | "output" | "ai" | "memory" | "ui" | "policy" | "tool" | "profile";
  permissions?: string[];
  capabilities?: PluginCapability[];
};
