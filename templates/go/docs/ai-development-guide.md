# AI Development Guide

This Go plugin template should remain safe and minimal.

## Checklist

- Keep stdout for JSON-RPC only.
- Use stderr for logs.
- Add tests for capabilities and protocol handlers.
- Run `gofmt` and `go test ./...`.
- Do not add real side effects without an explicit action gate design.
