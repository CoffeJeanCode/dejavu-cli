import { glob } from 'glob';
import { pathToFileURL } from 'node:url';

export const loadCommands = async () => {
  const modulesPaths = await glob("./src/commands/**/index.ts", { ignore: ["node_modules/**"], absolute: true });

  const modules = await Promise.all(
    modulesPaths.map(async (filePath) => {
      const fileUrl = pathToFileURL(filePath).href;
      const mod = await import(fileUrl);
      return mod.default;
    })
  );

  return modules
};