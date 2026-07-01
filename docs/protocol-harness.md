# Protocol Harness

## PT-BR

O template inclui `createProtocolHarness()` em `src/harness.ts` para simular chamadas do core em testes.

Uso típico:

```ts
const harness = createProtocolHarness();
harness.peer.on("example.ping", () => ({ pong: true }));
const listening = harness.peer.listen();
harness.send({ jsonrpc: "2.0", id: "1", method: "example.ping" });
harness.close();
await listening;
```

## EN

The template includes `createProtocolHarness()` in `src/harness.ts` to simulate core calls in tests.

Typical usage:

```ts
const harness = createProtocolHarness();
harness.peer.on("example.ping", () => ({ pong: true }));
const listening = harness.peer.listen();
harness.send({ jsonrpc: "2.0", id: "1", method: "example.ping" });
harness.close();
await listening;
```
