# AuxiTalk Plugin Templates

> Hub oficial de templates e documentação para criação de plugins AuxiTalk.  
> Official hub of templates and documentation for creating AuxiTalk plugins.

---

## Português (PT-BR)

## Visão geral

Este repositório reúne templates oficiais e documentação para criar plugins compatíveis com o AuxiTalk.

O objetivo é permitir que qualquer pessoa crie plugins em diferentes linguagens seguindo o mesmo protocolo, manifesto e boas práticas de segurança.

## Templates disponíveis

```txt
templates/typescript-node   TypeScript/Node.js
templates/go                Go
```

## Qual template escolher?

Use **TypeScript/Node.js** para:

- integrações web;
- automação de navegador;
- overlays desktop baseados em JS;
- protótipos rápidos.

Use **Go** para:

- plugins leves;
- binários únicos;
- ferramentas locais;
- plugins de alta eficiência.

## Como começar

### TypeScript/Node.js

```sh
cd templates/typescript-node
npm install
npm run setup
npm test
npm run build
```

### Go

```sh
cd templates/go
go test ./...
go build -o plugin ./cmd/plugin
```

## Conceitos principais

Todo plugin AuxiTalk possui:

- `plugin.json`;
- comunicação JSON-RPC 2.0 sobre stdio;
- lifecycle (`plugin.handshake`, `plugin.start`, `plugin.stop`, `plugin.health`);
- capabilities;
- permissões declaradas;
- logs via stderr.

## Regras importantes

- `stdout` deve conter somente JSON-RPC.
- `stderr` deve ser usado para logs.
- não salve tokens no repositório.
- declare permissões mínimas.
- valide entradas.
- ações sensíveis devem usar `action.request`.

## Documentação

```txt
docs/development.md
docs/protocol.md
docs/security.md
docs/publishing.md
docs/sdk-helpers.md
docs/protocol-harness.md
```

---

## English (EN)

## Overview

This repository contains official templates and documentation for creating AuxiTalk-compatible plugins.

The goal is to let anyone build plugins in different languages while following the same protocol, manifest format, and security practices.

## Available templates

```txt
templates/typescript-node   TypeScript/Node.js
templates/go                Go
```

## Which template should I choose?

Use **TypeScript/Node.js** for:

- web integrations;
- browser automation;
- JS-based desktop overlays;
- quick prototypes.

Use **Go** for:

- lightweight plugins;
- single binaries;
- local tools;
- high-efficiency plugins.

## Getting started

### TypeScript/Node.js

```sh
cd templates/typescript-node
npm install
npm run setup
npm test
npm run build
```

### Go

```sh
cd templates/go
go test ./...
go build -o plugin ./cmd/plugin
```

## Main concepts

Every AuxiTalk plugin has:

- `plugin.json`;
- JSON-RPC 2.0 over stdio communication;
- lifecycle (`plugin.handshake`, `plugin.start`, `plugin.stop`, `plugin.health`);
- capabilities;
- declared permissions;
- stderr logging.

## Important rules

- `stdout` must contain only JSON-RPC.
- `stderr` must be used for logs.
- do not store tokens in the repository.
- declare minimal permissions.
- validate inputs.
- sensitive actions must use `action.request`.

## Documentation

```txt
docs/development.md
docs/protocol.md
docs/security.md
docs/publishing.md
docs/sdk-helpers.md
docs/protocol-harness.md
```
