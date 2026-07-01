# Protocol

## PT-BR

O plugin usa JSON-RPC 2.0 sobre stdio.

- `stdout`: somente mensagens JSON-RPC.
- `stderr`: logs humanos.
- cada mensagem deve ocupar uma linha.

Métodos implementados:

```txt
plugin.handshake
plugin.start
plugin.stop
plugin.health
capability.call
```

## EN

The plugin uses JSON-RPC 2.0 over stdio.

- `stdout`: JSON-RPC messages only.
- `stderr`: human logs.
- each message must be one line.

Implemented methods:

```txt
plugin.handshake
plugin.start
plugin.stop
plugin.health
capability.call
```
