# AI Development Guide

This guide is for AI coding agents working on AuxiTalk plugin templates.

## Goal

Help create safe, consistent plugin templates that new plugins can copy from.

## Standard plugin behavior

A plugin should:

- read JSON-RPC requests from stdin;
- write JSON-RPC responses/events to stdout;
- write logs to stderr;
- respond to `plugin.health`;
- handle `plugin.stop` if graceful shutdown is possible;
- declare capabilities in `plugin.json`;
- use `event.emit` to notify the core;
- use `action.request` for risky work.

## Safe development flow

1. Inspect the template language and package manager.
2. Keep protocol code small and explicit.
3. Add tests for JSON-RPC behavior.
4. Avoid real side effects in templates.
5. Run available tests/builds.
6. Commit only when requested.
7. Push only when explicitly requested.

## New plugin checklist

When creating a new AuxiTalk plugin repository, include:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai-development-guide.md`
- `README.md`
- `README.pt-BR.md` if useful
- `plugin.json`
- source code
- tests
- `.gitignore`

## Common plugin categories

- input plugins: receive events from channels, files, webhooks, terminals;
- output plugins: send messages, show UI, write files;
- AI plugins: provide model capabilities;
- tool plugins: execute controlled operations;
- memory plugins: store/retrieve context;
- UI plugins: dashboard or control surfaces;
- workflow plugins: execute or extend workflow actions.
