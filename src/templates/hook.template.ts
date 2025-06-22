// src/templates/hook.template.ts
import { capitalize } from "@/utils/capitalize.util";
import { BaseTemplate } from "./base-template";
import { join } from "path";

interface HookTemplateOptions {
  name: string;
  extension: "js" | "tsx";
  language: "javascript" | "typescript";
  mainFolder: string;
}

export class HookTemplate extends BaseTemplate {
  async createHook(options: HookTemplateOptions) {
    const { name, extension, language, mainFolder } = options;

    const hookDir = join(mainFolder, "hooks");
    const fileName = this.formatHookName(name); // e.g., "useTheme"
    const filePath = this.getFilePath(hookDir, fileName, extension);
    const content = this.generateHookContent(fileName, language);

    await this.createFolder(hookDir);
    await this.createFile(filePath, content);
  }

  private generateHookContent(hookName: string, language: string): string {
    const importReact = `import { useState, useEffect } from 'react';`;

    return `${importReact}

export const ${hookName} = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Logic here
  }, []);

  return { state, setState };
};`;
  }

  private formatHookName(str: string): string {
    return `use${capitalize(str)}`;
  }
}
