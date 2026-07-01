import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = createInterface({ input, output });

const pluginId = await ask("Plugin id", "my-plugin");
const pluginName = await ask("Plugin name", "My Plugin");
const pluginKind = await ask("Plugin kind", "tool");
const capability = await ask("Primary capability", "example.ping");
const packageName = await ask("Package name", `@auxitalk/${pluginId}`);

rl.close();

const pluginJson = JSON.parse(readFileSync("plugin.json", "utf8"));
pluginJson.id = pluginId;
pluginJson.name = pluginName;
pluginJson.kind = pluginKind;
pluginJson.capabilities = capability ? [{ name: capability }] : [];
writeFileSync("plugin.json", `${JSON.stringify(pluginJson, null, 2)}\n`);

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
packageJson.name = packageName;
packageJson.description = `${pluginName} for AuxiTalk`;
writeFileSync("package.json", `${JSON.stringify(packageJson, null, 2)}\n`);

console.log("Plugin template configured.");

async function ask(label, fallback) {
  const answer = await rl.question(`${label} (${fallback}): `);
  return answer.trim() || fallback;
}
