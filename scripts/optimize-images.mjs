import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve("public/assets");
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = await walk(ASSETS_DIR);
const targets = allFiles.filter((file) => SOURCE_EXT.has(path.extname(file).toLowerCase()));

let converted = 0;
for (const source of targets) {
  const webpPath = source.replace(/\.(png|jpe?g)$/i, ".webp");
  try {
    await fs.access(webpPath);
    continue;
  } catch {
    // file does not exist yet
  }

  await sharp(source).webp({ quality: 82, effort: 5 }).toFile(webpPath);
  converted += 1;
}

console.log(`Image optimization complete. New .webp files: ${converted}`);
