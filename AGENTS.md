# AGENTS.md

This repository is an AuxiTalk plugin template repository.

Plugins are external processes that communicate with AuxiTalk Core using JSON-RPC 2.0 over line-delimited stdio.

## Required context

Read first:

1. `README.md`
2. `docs/authoring.md`
3. `docs/ai-development-guide.md`
4. Template-specific files under `templates/*`

## Required checks

For Go templates or plugins:

```sh
go test ./...
```

For Node/TypeScript templates or plugins, use the package scripts if present:

```sh
npm test
npm run build
```

Run formatters for changed files when available.

## Plugin protocol rules

- stdout is reserved for JSON-RPC messages only.
- stderr is for logs.
- every JSON-RPC message must be one line.
- implement `plugin.health`.
- implement `plugin.stop` when possible.
- emit events through `event.emit`.
- request risky work through `action.request`.
- never log secrets.

## Safety rules

- Prefer dry-run behavior for examples.
- Do not perform real external side effects in templates.
- Do not commit API keys, tokens, sessions, or local databases.
- Keep template code minimal and easy to adapt.

## When creating a new plugin

Always include:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai-development-guide.md`
- `README.md`
- `README.pt-BR.md` when appropriate
- `plugin.json`
- tests for protocol behavior

## Product framing

AuxiTalk plugins are not only chat integrations. Plugins may provide inputs, outputs, tools, AI agents, memory, dashboard surfaces, terminal automation, webhooks, or workflow executors.
