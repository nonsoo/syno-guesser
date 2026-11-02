import { Temporal } from "@js-temporal/polyfill";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Temporal polyfill setup", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("installs the polyfill when Temporal is unavailable", async () => {
    vi.stubGlobal("Temporal", undefined);

    await import("@/utils/helpers/ensure-temporal");

    expect(globalThis.Temporal).toBe(Temporal);
  });
});
