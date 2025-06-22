// src/templates/page.template.ts
import { capitalize } from "@/utils/capitalize.util";
import { BaseTemplate } from "./base-template"; // Imports the base class providing common file and logging utilities.
import { join } from "path"; // Imports the `join` function for constructing file paths safely across different operating systems.

/**
 * @interface PageTemplateOptions
 * @description Defines the configuration options required to create a new page component file.
 * @property {string} name - The name of the page, which will also be used to create its dedicated folder.
 * @property {"js" | "tsx"} extension - The file extension for the page component (e.g., "js" for JavaScript, "tsx" for TypeScript with JSX).
 * @property {"javascript" | "typescript"} language - The programming language of the page, influencing content generation.
 * @property {string} mainFolder - The root directory where the 'pages' folder will be created.
 */
interface PageTemplateOptions {
  name: string;
  extension: "js" | "tsx";
  language: "javascript" | "typescript";
  mainFolder: string;
}

/**
 * @class PageTemplate
 * @extends BaseTemplate
 * @description
 * Manages the creation of new page component files within a project.
 * This class extends `BaseTemplate` to reuse common file system operations and logging capabilities.
 * It's responsible for determining the correct folder structure for pages, generating basic page content,
 * and then performing the file and folder creation.
 */
export class PageTemplate extends BaseTemplate {
  /**
   * @method createPage
   * @async
   * @description
   * Orchestrates the creation of a new page component. It calculates the page's directory
   * (e.g., `mainFolder/pages/pageName`), capitalizes the page name for the component,
   * generates the file path for the `index` file within that page directory,
   * creates the boilerplate content, ensures the page directory exists, and finally
   * creates the `index` file.
   * @param {PageTemplateOptions} options - Configuration options for the page to be created.
   * @returns {Promise<void>} A promise that resolves when the page's folder and `index` file have been successfully created.
   */
  async createPage(options: PageTemplateOptions) {
    const { name, extension, language, mainFolder } = options;

    // Defines the specific directory for this page (e.g., 'mainFolder/pages/my-page').
    const pageDir = join(mainFolder, "pages", name);
    // Capitalizes the page name for use in component naming (e.g., "my-page" becomes "MyPage").
    const pageName = capitalize(name);
    // Constructs the full path for the page's index file (e.g., 'my-page/index.tsx').
    const filePath = this.getFilePath(pageDir, "index", extension);
    // Generates the initial content for the page component.
    const content = this.generateContent(pageName, language);

    // Ensures the specific page directory exists, creating parent directories if necessary.
    await this.createFolder(pageDir);
    // Creates the actual `index` file with the generated content inside the page directory.
    await this.createFile(filePath, content);
  }

  /**
   * @private
   * @method generateContent
   * @description
   * Generates the boilerplate string content for a new page component.
   * This currently returns a simple React functional component structure.
   * The `language` parameter is available for future expansion to generate
   * language-specific templates (e.g., specific TypeScript types).
   * @param {string} name - The capitalized name of the page component (e.g., "HomePage").
   * @param {string} language - The target language for the page (e.g., "javascript", "typescript").
   * @returns {string} The string content ready to be written to the page file.
   */
  private generateContent(name: string, language: string): string {
    return `export default function ${name}() {
  return (
    <div>
      <h1>${name} Page</h1>
    </div>
  );
}`;
  }
}