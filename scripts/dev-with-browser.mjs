import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";
import open from "open";
import waitOn from "wait-on";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const url = "http://127.0.0.1:3000";

const child = spawn("npm", ["run", "dev:server"], {
  cwd: root,
  shell: true,
  stdio: "inherit",
  env: process.env,
});

child.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

void (async () => {
  try {
    await waitOn({
      resources: [`tcp:127.0.0.1:3000`],
      timeout: 90_000,
      interval: 250,
    });
    await open(url);
  } catch (e) {
    console.error("No se pudo abrir el navegador automáticamente. Abre manualmente:", url);
    console.error(e);
  }
})();

const code = await new Promise((resolve) => {
  child.on("exit", (c) => resolve(typeof c === "number" ? c : 0));
});

process.exit(code);
