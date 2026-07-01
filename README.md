# AuxiTalk Plugin Template

> Template oficial para criar plugins do AuxiTalk.  
> Official template for creating AuxiTalk plugins.

---

## Português (PT-BR)

### Visão geral

Este repositório é o template oficial para criar plugins do AuxiTalk usando TypeScript/Node.js.

Ele fornece:

- manifesto `plugin.json`;
- runtime básico de plugin;
- helper JSON-RPC 2.0 sobre stdio;
- lifecycle `plugin.handshake`, `plugin.start`, `plugin.stop`, `plugin.health`;
- exemplo de capability `example.ping`;
- testes básicos;
- CLI `npm run setup` para renomear o template;
- helpers para eventos, ações, memória e IA;
- harness de protocolo para testes;
- documentação de desenvolvimento e segurança.

### Como usar

```sh
git clone https://github.com/AuxiTalk/plugin-template my-plugin
cd my-plugin
npm install
npm run setup
npm test
npm run build
npm run dev
```

Depois edite:

- `plugin.json`;
- `package.json`;
- `README.md`;
- `src/capabilities.ts`.

### Regras importantes

- `stdout` deve conter apenas JSON-RPC.
- logs humanos devem ir para `stderr`.
- não salve tokens no repositório.
- declare somente permissões necessárias.
- ações sensíveis devem usar `action.request`.

### Estrutura

```txt
src/       implementação do plugin
test/      testes
docs/      documentação
plugin.json manifesto do plugin
```

---

## English (EN)

### Overview

This repository is the official template for creating AuxiTalk plugins using TypeScript/Node.js.

It provides:

- `plugin.json` manifest;
- basic plugin runtime;
- JSON-RPC 2.0 over stdio helper;
- lifecycle `plugin.handshake`, `plugin.start`, `plugin.stop`, `plugin.health`;
- example capability `example.ping`;
- basic tests;
- `npm run setup` CLI to rename the template;
- helpers for events, actions, memory, and AI;
- protocol harness for tests;
- development and security documentation.

### How to use

```sh
git clone https://github.com/AuxiTalk/plugin-template my-plugin
cd my-plugin
npm install
npm run setup
npm test
npm run build
npm run dev
```

Then edit:

- `plugin.json`;
- `package.json`;
- `README.md`;
- `src/capabilities.ts`.

### Important rules

- `stdout` must contain only JSON-RPC.
- human logs must go to `stderr`.
- do not store tokens in the repository.
- declare only required permissions.
- sensitive actions must use `action.request`.

### Structure

```txt
src/       plugin implementation
test/      tests
docs/      documentation
plugin.json plugin manifest
```
