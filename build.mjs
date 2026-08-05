import { copyFileSync, mkdirSync, rmSync } from "node:fs";

rmSync("public", { force: true, recursive: true });
mkdirSync("public");

for (const file of ["index.html", "styles.css", "water.js"]) {
  copyFileSync(file, `public/${file}`);
}
