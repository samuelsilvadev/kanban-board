const { TextDecoder, TextEncoder } = require("node:util");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

const { Blob, File } = require("node:buffer");
const { fetch, Headers, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  Request: { value: Request },
  Response: { value: Response },
});
