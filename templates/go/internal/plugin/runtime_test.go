package plugin

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestLoadManifest(t *testing.T) {
	manifest, err := LoadManifest("../../plugin.json")
	if err != nil {
		t.Fatalf("LoadManifest: %v", err)
	}
	if manifest.ID != "my-go-plugin" {
		t.Fatalf("unexpected id %s", manifest.ID)
	}
}

func TestRuntimeHandshake(t *testing.T) {
	tmp := t.TempDir()
	manifestPath := filepath.Join(tmp, "plugin.json")
	data, err := os.ReadFile("../../plugin.json")
	if err != nil {
		t.Fatalf("read manifest: %v", err)
	}
	if err := os.WriteFile(manifestPath, data, 0o600); err != nil {
		t.Fatalf("write manifest: %v", err)
	}

	input := strings.NewReader(`{"jsonrpc":"2.0","id":"1","method":"plugin.handshake"}` + "\n")
	var output bytes.Buffer
	var logs bytes.Buffer

	runtime, err := NewRuntime(manifestPath, input, &output, &logs)
	if err != nil {
		t.Fatalf("NewRuntime: %v", err)
	}
	if err := runtime.Listen(); err != nil {
		t.Fatalf("Listen: %v", err)
	}

	if !strings.Contains(output.String(), `"pluginId":"my-go-plugin"`) {
		t.Fatalf("unexpected output: %s", output.String())
	}
}
