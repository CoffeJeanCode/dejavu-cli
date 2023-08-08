// src/services/component-template.service.ts

import { join } from "path";
import { Language, TypeComponent } from "../models/config.model";
import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";
import { formatComponentName } from "../utils/format-component-name.util";
import { match } from "../utils/pattern-match.util";

export class ComponentTemplate {
  private fileManager: FileManager;
  private logger: Logger;

  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
  }

  private getTemplate = (componentName: string) => `
  const ${componentName} = () => {
    return <div></div>
  }

  export default ${componentName}
  `;

  private createFile = async (componentPath: string, componentName: string) => {
    const componentContent = this.getTemplate(componentName);
    await this.fileManager.createFileIfNotExists(
      componentPath,
      componentContent
    );
  };

  private async createBarrel(
    barrelFolder: string,
    barrelPath: string,
    componentName: string
  ): Promise<void> {
    const barrelContent = `export { default } from './${componentName}';`;
    this.fileManager
      .createDirectoryIfNotExists(barrelFolder)
      .then(
        async () =>
          await this.fileManager.createFileIfNotExists(
            barrelPath,
            barrelContent
          )
      );
  }

  async createComponent(
    name: string,
    typeComponent: TypeComponent,
    language: Language,
    mainFolder: string
  ): Promise<void> {
    const formatedName = formatComponentName(name);
    const componentFolder = join(mainFolder, "components");
    const extension = language === Language.typescript ? "tsx" : "js";
    const componentName = `${formatedName}.${extension}`;
    const componentPath =
      typeComponent == TypeComponent.barrel
        ? join(componentFolder, formatedName, componentName)
        : join(componentFolder, componentName);

    try {
      await this.fileManager.createDirectoryIfNotExists(componentFolder);

      if (await this.fileManager.exists(componentPath)) {
        this.logger.info(`Component ${formatedName} already exists`);
        return;
      }

      match(
        typeComponent,
        [
          [TypeComponent.file],
          async () => {
            const componentPath = join(componentFolder, componentName);
            await this.createFile(componentPath, formatedName);
          },
        ],
        [
          [TypeComponent.barrel],
          async () => {
            const barrelName = `index.${extension}`;
            const barrelFolder = join(componentFolder, formatedName);
            const barrelPath = join(componentFolder, formatedName, barrelName);

            await this.createBarrel(barrelFolder, barrelPath, formatedName);
            await this.createFile(componentPath, formatedName);
          },
        ]
      )();

      this.logger.success(`Component ${formatedName} created`);
    } catch (error) {
      this.logger.error("Error creating components:", String(error));
    }
  }
}
