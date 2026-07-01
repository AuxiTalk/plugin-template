import { describe, expect, it } from "vitest";
import { createEvent } from "../src/events.js";

describe("events", () => {
  it("creates an event", () => {
    const event = createEvent("example.started", "my-plugin", { ok: true });

    expect(event.type).toBe("example.started");
    expect(event.source).toBe("my-plugin");
    expect(event.payload).toEqual({ ok: true });
    expect(typeof event.id).toBe("string");
    expect(typeof event.createdAt).toBe("string");
  });
});
