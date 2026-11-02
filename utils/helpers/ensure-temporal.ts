import { Temporal } from "@js-temporal/polyfill";

if (typeof globalThis.Temporal === "undefined") {
  Object.defineProperty(globalThis, "Temporal", {
    configurable: true,
    value: Temporal,
    writable: true,
  });
}
