# AuxiTalk Plugin Templates

Official hub for AuxiTalk plugin templates and plugin authoring documentation.

> Portuguese documentation: [README.pt-BR.md](README.pt-BR.md)

## Overview

This repository helps developers create AuxiTalk-compatible plugins in different programming languages.

It is both:

- a collection of official plugin templates;
- a documentation hub for plugin authors.

AuxiTalk plugins are external processes that communicate with AuxiTalk Core using JSON-RPC 2.0 over stdio.

## Available templates

| Template | Path | Best for |
| --- | --- | --- |
| TypeScript/Node.js | `templates/typescript-node` | web integrations, browser automation, overlays, quick prototypes |
| Go | `templates/go` | lightweight plugins, single binaries, local tools, efficient integrations |

## Quick start

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

## What every plugin contains

Every AuxiTalk plugin should include:

- `plugin.json` manifest;
- JSON-RPC 2.0 over stdio communication;
- lifecycle methods:
  - `plugin.handshake`
  - `plugin.start`
  - `plugin.stop`
  - `plugin.health`
- declared permissions;
- declared capabilities;
- stderr logging;
- documentation for configuration, permissions, capabilities, and events.

## Basic protocol rules

- `stdout` must contain only JSON-RPC messages.
- `stderr` must be used for human-readable logs.
- each JSON-RPC message must be one line.
- plugins must declare minimal permissions.
- plugins must validate external input.
- sensitive actions must use `action.request`.
- secrets must never be committed.

## Template selection guide

Choose **TypeScript/Node.js** if you are building:

- a browser integration;
- a WhatsApp Web or web app connector;
- a desktop overlay using JS tooling;
- a quick prototype;
- an integration that depends on npm packages.

Choose **Go** if you are building:

- a lightweight local tool;
- a single-binary plugin;
- a memory or filesystem plugin;
- a performance-sensitive integration;
- a plugin that should run with minimal dependencies.

## Repository structure

```txt
docs/                       plugin authoring documentation
templates/typescript-node    TypeScript/Node.js template
templates/go                 Go template
README.md                    English overview
README.pt-BR.md              Portuguese overview
```

## Documentation

- `docs/authoring.md`
- `docs/development.md`
- `docs/protocol.md`
- `docs/security.md`
- `docs/publishing.md`
- `docs/sdk-helpers.md`
- `docs/protocol-harness.md`

## Recommended plugin repository layout

Official plugins should usually live in separate repositories:

```txt
AuxiTalk/plugin-whatsapp-web
AuxiTalk/plugin-openai
AuxiTalk/plugin-sqlite-memory
AuxiTalk/plugin-desktop-overlay
```

This keeps plugins independently versioned, tested, and released.

## Related repositories

- `AuxiTalk/auxitalk` — core runtime.
- `AuxiTalk/plugin-template` — templates and plugin authoring documentation.

## License

MIT
