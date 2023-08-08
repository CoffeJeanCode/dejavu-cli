import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: "node14",
  minify: true,
  external: ["inquirer", "fs", "path", "commander", "chalk"],
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
