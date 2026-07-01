import { describe, expect, it } from "vitest";
import { validateManifest } from "../src/manifest.js";
import type { PluginManifest } from "../src/types.js";

describe("manifest", () => {
  it("accepts a valid manifest", () => {
    const manifest: PluginManifest = {
      id: "my-plugin",
      name: "My Plugin",
      version: "0.1.0",
      runtime: "node",
      entry: "dist/index.js",
      kind: "tool",
      capabilities: [{ name: "example.ping" }],
    };

    expect(() => validateManifest(manifest)).not.toThrow();
  });

  it("rejects missing id", () => {
    const manifest = {
      name: "My Plugin",
      version: "0.1.0",
      runtime: "node",
      entry: "dist/index.js",
      kind: "tool",
    } as PluginManifest;

    expect(() => validateManifest(manifest)).toThrow("plugin id is required");
  });
});
