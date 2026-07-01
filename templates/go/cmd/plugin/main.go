package main

import (
	"log"
	"os"

	"github.com/auxitalk/my-plugin/internal/plugin"
)

func main() {
	runtime, err := plugin.NewRuntime("plugin.json", os.Stdin, os.Stdout, os.Stderr)
	if err != nil {
		log.Fatalf("plugin init: %v", err)
	}

	if err := runtime.Listen(); err != nil {
		log.Fatalf("plugin listen: %v", err)
	}
}
