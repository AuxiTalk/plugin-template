import { loadManifest } from "./manifest.js";
import { RpcPeer } from "./rpc.js";
import { PluginRuntime } from "./runtime.js";

const manifest = loadManifest();
const peer = new RpcPeer();
const runtime = new PluginRuntime(manifest, peer);

await runtime.listen();
