import { join } from "path";
import { BaseTemplate } from "../models/base-template.model";
import { Extension, Language } from "../models/config.model";
import { formatComponentName } from "../utils/format-component-name.util";

/**
 * Utility class for generating and creating page templates.
 *
 * This class provides methods to generate page templates and create the corresponding
 * file structure for pages in an application. It supports multiple programming languages.
 *
 * @class
 */
export class PageTemplate extends BaseTemplate {
  constructor() {
    super();
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
   * @function createPageFile
   * @param {string} pagePath - The path where the page file should be created.
   * @param {string} pageName - The name of the page.
   * @throws {Error} If an error occurs during file creation.
   */
  private createPageFile = async (pagePath: string, pageName: string) => {
    const pageContent = this.getTemplate(pageName);
    await this.createFile(pagePath, pageContent);
  };

  /**
   * Creates the necessary folder structure for a page.
   *
   * @async
   * @function createFolderStructure
   * @param {string} pageFolder - The path where the page folder should be created.
   * @param {string} pageName - The name of the page.
   */
  private createFolderStructure = async (pageFolder: string) => {
    const componentsFolder = join(pageFolder, "components");
    const modelsFolder = join(pageFolder, "models");

    await this.fileManager.createDirectoryIfNotExists(pageFolder);
    await this.fileManager.createDirectoryIfNotExists(componentsFolder);
    await this.fileManager.createDirectoryIfNotExists(modelsFolder);
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
  async createPage({
    name,
    language,
    extension,
    mainFolder,
  }: {
    name: string;
    language: Language;
    extension: Extension;
    mainFolder: string;
  }) {
    const formattedName = formatComponentName(name);
    const pagesFolder = join(mainFolder, "pages");
    const pageName = `index.${extension}`;
    const pageFolder = join(pagesFolder, formattedName);
    const pagePath = join(pageFolder, pageName);

    try {
      await this.createFolderStructure(pageFolder);
      await this.createPageFile(pagePath, formattedName);

      this.logger.success(`Page ${formattedName} created`);
    } catch (error) {
      this.logger.error("Error creating pages:", String(error));
    }
  }
}
