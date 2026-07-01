package plugin

import (
	"encoding/json"
	"fmt"
	"os"
)

type Manifest struct {
	ID           string       `json:"id"`
	Name         string       `json:"name"`
	Version      string       `json:"version"`
	Runtime      string       `json:"runtime"`
	Entry        string       `json:"entry"`
	Kind         string       `json:"kind"`
	Permissions  []string     `json:"permissions,omitempty"`
	Capabilities []Capability `json:"capabilities,omitempty"`
}

type Capability struct {
	Name string `json:"name"`
}

func LoadManifest(path string) (Manifest, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Manifest{}, err
	}

	var manifest Manifest
	if err := json.Unmarshal(data, &manifest); err != nil {
		return Manifest{}, err
	}

	if manifest.ID == "" {
		return Manifest{}, fmt.Errorf("manifest id is required")
	}
	if manifest.Name == "" {
		return Manifest{}, fmt.Errorf("manifest name is required")
	}
	if manifest.Version == "" {
		return Manifest{}, fmt.Errorf("manifest version is required")
	}
	if manifest.Runtime == "" {
		return Manifest{}, fmt.Errorf("manifest runtime is required")
	}
	if manifest.Kind == "" {
		return Manifest{}, fmt.Errorf("manifest kind is required")
	}

	return manifest, nil
}
