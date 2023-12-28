import { join } from "path";
import { BaseTemplate } from "../models/base-template.model";
import { Extension, Language, TypeComponent } from "../models/config.model";
import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";
import { formatComponentName } from "../utils/format-component-name.util";
import { match } from "../utils/pattern-match.util";

/**
 * Utility class for generating and creating component templates.
 *
 * This class provides methods to generate component templates and create the corresponding
 * files and folder structures for components in an application. It supports multiple programming languages
 * and component types.
 *
 * @class
 */
export class ComponentTemplate extends BaseTemplate {
  constructor() {
    super();
  }

  /**
   * Retrieves the template content for a component.
   *
   * @function getTemplate
   * @param {string} componentName - The name of the component.
   * @returns {string} The template content for the component.
   */
  private getTemplate = (componentName: string) => `
  const ${componentName} = () => {
    return <div></div>
  }

  export default ${componentName}
  `;

  /**
   * Creates a file for a component with the specified content.
   *
   * @async
   * @function createFileComponent
   * @param {string} componentPath - The path where the component file should be created.
   * @param {string} componentName - The name of the component.
   * @throws {Error} If an error occurs during file creation.
   */
  private createFileComponent = async (
    componentPath: string,
    componentName: string
  ) => {
    const componentContent = this.getTemplate(componentName);
    await this.createFile(componentPath, componentContent);
  };

  /**
   * Creates a barrel file for a component.
   *
   * @async
   * @function createBarrel
   * @param {string} barrelFolder - The path where the barrel folder should be created.
   * @param {string} barrelPath - The path where the barrel file should be created.
   * @param {string} componentName - The name of the component.
   * @throws {Error} If an error occurs during file or folder creation.
   */
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

  /**
   * Creates a component with the specified name, type, language, and main folder.
   *
   * @async
   * @function createComponent
   * @param {string} name - The name of the component.
   * @param {TypeComponent} typeComponent - The type of the component (file or barrel).
   * @param {Language} language - The programming language to use (typescript or javascript).
   * @param {string} mainFolder - The main folder of the application.
   * @throws {Error} If an error occurs during component creation or file handling.
   */
  async createComponent({
    name,
    typeComponent,
    language,
    extension,
    mainFolder,
  }: {
    name: string;
    typeComponent: TypeComponent;
    language: Language;
    extension: Extension;
    mainFolder: string;
  }): Promise<void> {
    const formattedName = formatComponentName(name);
    const componentFolder = join(mainFolder, "components");
    const componentName = `${formattedName}.${extension}`;
    const componentPath =
      typeComponent == TypeComponent.barrel
        ? join(componentFolder, formattedName, componentName)
        : join(componentFolder, componentName);

    try {
      await this.fileManager.createDirectoryIfNotExists(componentFolder);

      if (await this.fileManager.exists(componentPath)) {
        this.logger.info(`Component ${formattedName} already exists`);
        return;
      }

      match(
        typeComponent,
        [
          [TypeComponent.file],
          async () => {
            const componentPath = join(componentFolder, componentName);
            await this.createFileComponent(componentPath, formattedName);
          },
        ],
        [
          [TypeComponent.barrel],
          async () => {
            const barrelName = `index.${extension}`;
            const barrelFolder = join(componentFolder, formattedName);
            const barrelPath = join(componentFolder, formattedName, barrelName);

            await this.createBarrel(barrelFolder, barrelPath, formattedName);
            await this.createFileComponent(componentPath, formattedName);
          },
        ]
      )();
    } catch (error) {
      this.logger.error("Error creating components:", String(error));
    }
  }
}
