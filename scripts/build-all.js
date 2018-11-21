#!/usr/bin/env node

const runCmd = require("./run-cmd");
const { resolve, join } = require("path");
const cwd = resolve(__dirname, "../");
/**
 * @type {{workspaces: string[]}}
 */
const pkg = require(join(cwd, "package.json"));
const { workspaces } = pkg;
/** */
async function run() {
  for (const ws of workspaces) {
    let wsPkg;
    try {
      /** @type {{ name: string , scripts: { [[key: string]: string]}}} */
      wsPkg = require(resolve(cwd, ws, "package.json"));
      if (wsPkg.scripts && "build" in wsPkg.scripts) {
        console.log("Package: %s", wsPkg.name);
        await runCmd("yarn", ["workspace", wsPkg.name, "build"]);
      }
    } catch (error) {
      console.log("%s error: \n", wsPkg.name, error);
      process.exit(-1);
    }
  }
  console.log("Done!");
}
run();
