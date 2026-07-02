# AGENTS.md

This is an AuxiTalk TypeScript/Node plugin.

Follow JSON-RPC 2.0 over line-delimited stdio:

- stdout: JSON-RPC only
- stderr: logs only
- implement `plugin.health`
- implement `plugin.stop` when possible
- use `event.emit` for events
- use `action.request` for risky actions

Before finishing code changes, run available scripts such as:

```sh
npm test
npm run build
```

Never commit secrets, API keys, local sessions, or databases.
