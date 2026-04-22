import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const serverEntryPath = path.resolve("dist/server/entry-server.js");

const template = await fs.readFile(indexPath, "utf8");
const serverModuleUrl = pathToFileURL(serverEntryPath).href;
const { render } = await import(serverModuleUrl);

const appHtml = render("/");
const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

await fs.writeFile(indexPath, html, "utf8");
console.log("Prerender complete: dist/index.html");
