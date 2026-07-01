import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { PluginManifest } from "./types.js";

export function loadManifest(path = "plugin.json"): PluginManifest {
  const manifestPath = resolve(process.cwd(), path);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as PluginManifest;
  validateManifest(manifest);
  return manifest;
}

export function validateManifest(manifest: PluginManifest): void {
  if (!manifest.id) throw new Error("plugin id is required");
  if (!manifest.name) throw new Error("plugin name is required");
  if (!manifest.version) throw new Error("plugin version is required");
  if (!manifest.runtime) throw new Error("plugin runtime is required");
  if (!manifest.entry) throw new Error("plugin entry is required");
  if (!manifest.kind) throw new Error("plugin kind is required");

  for (const capability of manifest.capabilities ?? []) {
    if (!capability.name) throw new Error("capability name is required");
  }
}
