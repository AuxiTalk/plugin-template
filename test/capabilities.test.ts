import { describe, expect, it } from "vitest";
import { callCapability, listCapabilities } from "../src/capabilities.js";

describe("capabilities", () => {
  it("lists example.ping", () => {
    expect(listCapabilities()).toContain("example.ping");
  });

  it("calls example.ping", async () => {
    await expect(callCapability("example.ping", { hello: "world" })).resolves.toEqual({
      pong: true,
      input: { hello: "world" },
    });
  });
});
