# AGENTS.md

This is an AuxiTalk Go plugin.

Follow JSON-RPC 2.0 over line-delimited stdio:

- stdout: JSON-RPC only
- stderr: logs only
- implement `plugin.health`
- implement `plugin.stop` when possible
- use `event.emit` for events
- use `action.request` for risky actions

Before finishing code changes:

```sh
gofmt -w <changed-go-files>
go test ./...
```

Never commit secrets, API keys, local sessions, or databases.
