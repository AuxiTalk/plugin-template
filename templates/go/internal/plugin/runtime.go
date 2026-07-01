package plugin

import (
	"encoding/json"
	"fmt"
	"io"
)

type Runtime struct {
	manifest Manifest
	rpc      *RPC
	logs     io.Writer
}

func NewRuntime(manifestPath string, input io.Reader, output io.Writer, logs io.Writer) (*Runtime, error) {
	manifest, err := LoadManifest(manifestPath)
	if err != nil {
		return nil, err
	}

	r := &Runtime{
		manifest: manifest,
		rpc:      NewRPC(input, output),
		logs:     logs,
	}
	r.registerHandlers()
	return r, nil
}

func (r *Runtime) Listen() error {
	fmt.Fprintf(r.logs, "[auxitalk-plugin] plugin ready id=%s\n", r.manifest.ID)
	return r.rpc.Listen()
}

func (r *Runtime) registerHandlers() {
	r.rpc.Handle("plugin.handshake", r.handshake)
	r.rpc.Handle("plugin.start", r.start)
	r.rpc.Handle("plugin.stop", r.stop)
	r.rpc.Handle("plugin.health", r.health)
	r.rpc.Handle("capability.call", r.capabilityCall)
}

func (r *Runtime) handshake(_ json.RawMessage) (any, error) {
	caps := make([]string, 0, len(r.manifest.Capabilities))
	for _, cap := range r.manifest.Capabilities {
		caps = append(caps, cap.Name)
	}
	return map[string]any{
		"pluginId":        r.manifest.ID,
		"protocolVersion": "0.1",
		"capabilities":     caps,
	}, nil
}

func (r *Runtime) start(_ json.RawMessage) (any, error) {
	fmt.Fprintf(r.logs, "[auxitalk-plugin] plugin started id=%s\n", r.manifest.ID)
	return map[string]any{"started": true}, nil
}

func (r *Runtime) stop(_ json.RawMessage) (any, error) {
	fmt.Fprintf(r.logs, "[auxitalk-plugin] plugin stopped id=%s\n", r.manifest.ID)
	return map[string]any{"stopped": true}, nil
}

func (r *Runtime) health(_ json.RawMessage) (any, error) {
	return map[string]any{"ok": true, "pluginId": r.manifest.ID}, nil
}

func (r *Runtime) capabilityCall(params json.RawMessage) (any, error) {
	var req struct {
		Name  string `json:"name"`
		Input any    `json:"input"`
	}
	if err := json.Unmarshal(params, &req); err != nil {
		return nil, err
	}
	if req.Name != "example.ping" {
		return nil, fmt.Errorf("capability not found: %s", req.Name)
	}
	return map[string]any{"pong": true, "input": req.Input}, nil
}
