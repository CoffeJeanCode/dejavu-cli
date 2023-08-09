import { join } from "path";
import { Language } from "../models/config.model";
import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";
import { formatComponentName } from "../utils/format-component-name.util";
import { match } from "../utils/pattern-match.util";

/**
 * Utility class for generating and creating page templates.
 *
 * This class provides methods to generate page templates and create the corresponding
 * file structure for pages in an application. It supports multiple programming languages.
 *
 * @class
 */
export class PageTemplate {
  private fileManager: FileManager;
  private logger: Logger;

  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
  }

  /**
   * Retrieves the template for a page.
   *
   * @function getTemplate
   * @param {string} pageName - The name of the page.
   * @returns {string} The template content for the page.
   */
  private getTemplate = (pageName: string) => `
    const ${pageName} = () => {
      return (
        <div>
            ${pageName}
        </div>
      );
    };

    export default ${pageName};
  `;

  /**
   * Creates a file for a page with the specified content.
   *
   * @async
   * @function createFile
   * @param {string} pagePath - The path where the page file should be created.
   * @param {string} pageName - The name of the page.
   * @throws {Error} If an error occurs during file creation.
   */
  private createFile = async (pagePath: string, pageName: string) => {
    const pageContent = this.getTemplate(pageName);
    await this.fileManager.createFileIfNotExists(pagePath, pageContent);
  };

  /**
   * Creates the necessary folder structure for a page.
   *
   * @async
   * @function createFolderStructure
   * @param {string} pageFolder - The path where the page folder should be created.
   * @param {string} pageName - The name of the page.
   * @returns {Promise<{ componentsFolder: string, modelsFolder: string }>} An object containing the paths of the components and models folders.
   */
  private createFolderStructure = async (
    pageFolder: string,
    pageName: string
  ) => {
    const componentsFolder = join(pageFolder, "components");
    const modelsFolder = join(pageFolder, "models");

    await this.fileManager.createDirectoryIfNotExists(pageFolder);
    await this.fileManager.createDirectoryIfNotExists(componentsFolder);
    await this.fileManager.createDirectoryIfNotExists(modelsFolder);

    return { componentsFolder, modelsFolder };
  };

  /**
   * Creates a page with the specified name and language.
   *
   * @async
   * @function createPage
   * @param {string} name - The name of the page.
   * @param {Language} language - The programming language to use (typescript or javascript).
   * @param {string} mainFolder - The main folder of the application.
   * @throws {Error} If an error occurs during page creation or file handling.
   */
  async createPage(
    name: string,
    language: Language,
    mainFolder: string
  ): Promise<void> {
    const formattedName = formatComponentName(name);
    const pagesFolder = join(mainFolder, "pages");
    const extension = language === Language.typescript ? "tsx" : "js";
    const pageName = `${formattedName}.${extension}`;
    const pageFolder = join(pagesFolder, formattedName);
    const pagePath = join(pageFolder, pageName);

    try {
      const { componentsFolder, modelsFolder } =
        await this.createFolderStructure(pageFolder, formattedName);

      const pageContent = this.getTemplate(formattedName);
      await this.fileManager.createFileIfNotExists(pagePath, pageContent);

      this.logger.success(`Page ${formattedName} created`);
    } catch (error) {
      this.logger.error("Error creating pages:", String(error));
    }
  }
}
