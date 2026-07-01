# AuxiTalk Plugin Templates

Hub oficial de templates e documentação para criação de plugins AuxiTalk.

> English documentation: [README.md](README.md)

## Visão geral

Este repositório ajuda desenvolvedores a criar plugins compatíveis com o AuxiTalk em diferentes linguagens de programação.

Ele é ao mesmo tempo:

- uma coleção de templates oficiais de plugins;
- um hub de documentação para autores de plugins.

Plugins AuxiTalk são processos externos que se comunicam com o AuxiTalk Core usando JSON-RPC 2.0 sobre stdio.

## Templates disponíveis

| Template | Caminho | Melhor para |
| --- | --- | --- |
| TypeScript/Node.js | `templates/typescript-node` | integrações web, automação de navegador, overlays, protótipos rápidos |
| Go | `templates/go` | plugins leves, binários únicos, ferramentas locais, integrações eficientes |

## Início rápido

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

## O que todo plugin contém

Todo plugin AuxiTalk deve incluir:

- manifesto `plugin.json`;
- comunicação JSON-RPC 2.0 sobre stdio;
- métodos de lifecycle:
  - `plugin.handshake`
  - `plugin.start`
  - `plugin.stop`
  - `plugin.health`
- permissões declaradas;
- capabilities declaradas;
- logs via stderr;
- documentação de configuração, permissões, capabilities e eventos.

## Regras básicas do protocolo

- `stdout` deve conter apenas mensagens JSON-RPC.
- `stderr` deve ser usado para logs humanos.
- cada mensagem JSON-RPC deve ocupar uma linha.
- plugins devem declarar permissões mínimas.
- plugins devem validar entradas externas.
- ações sensíveis devem usar `action.request`.
- secrets nunca devem ser commitados.

## Guia de escolha de template

Escolha **TypeScript/Node.js** se você está criando:

- integração com navegador;
- conector para WhatsApp Web ou app web;
- overlay desktop usando ferramentas JS;
- protótipo rápido;
- integração que depende de pacotes npm.

Escolha **Go** se você está criando:

- ferramenta local leve;
- plugin de binário único;
- plugin de memória ou filesystem;
- integração sensível a performance;
- plugin que deve rodar com poucas dependências.

## Estrutura do repositório

```txt
docs/                       documentação para autores de plugins
templates/typescript-node    template TypeScript/Node.js
templates/go                 template Go
README.md                    visão geral em inglês
README.pt-BR.md              visão geral em português
```

## Documentação

- `docs/authoring.md`
- `docs/development.md`
- `docs/protocol.md`
- `docs/security.md`
- `docs/publishing.md`
- `docs/sdk-helpers.md`
- `docs/protocol-harness.md`

## Layout recomendado para repositórios de plugins

Plugins oficiais devem geralmente viver em repositórios separados:

```txt
AuxiTalk/plugin-whatsapp-web
AuxiTalk/plugin-openai
AuxiTalk/plugin-sqlite-memory
AuxiTalk/plugin-desktop-overlay
```

Isso mantém plugins versionados, testados e publicados de forma independente.

## Repositórios relacionados

- `AuxiTalk/auxitalk` — core runtime.
- `AuxiTalk/plugin-template` — templates e documentação de criação de plugins.

## Licença

MIT
