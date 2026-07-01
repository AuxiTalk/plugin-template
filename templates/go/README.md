# AuxiTalk Go Plugin Template

> Template Go para plugins AuxiTalk.  
> Go template for AuxiTalk plugins.

## PT-BR

### Como usar

```sh
cd templates/go
go test ./...
go build -o plugin ./cmd/plugin
./plugin
```

### O que inclui

- `plugin.json`
- runtime básico
- JSON-RPC sobre stdio
- lifecycle básico
- capability `example.ping`
- testes

### Regras

- stdout deve conter apenas JSON-RPC.
- logs devem ir para stderr.
- actions sensíveis devem usar `action.request`.

## EN

### How to use

```sh
cd templates/go
go test ./...
go build -o plugin ./cmd/plugin
./plugin
```

### Included

- `plugin.json`
- basic runtime
- JSON-RPC over stdio
- basic lifecycle
- `example.ping` capability
- tests

### Rules

- stdout must contain only JSON-RPC.
- logs must go to stderr.
- sensitive actions must use `action.request`.
