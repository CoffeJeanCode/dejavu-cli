// src/templates/service.template.ts
import { BaseTemplate } from "./base-template";
import { join } from "path";

/**
 * @interface ServiceTemplateOptions
 * @description Defines the configuration options required to create a new service file.
 * @property {string} name - The base name of the service (e.g., "userService").
 * @property {"js" | "tsx"} extension - The file extension for the service file (e.g., "js" for JavaScript, "tsx" for TypeScript with JSX).
 * @property {"javascript" | "typescript"} language - The programming language of the service, influencing content generation.
 * @property {string} mainFolder - The root directory where the 'services' folder will be created.
 */
interface ServiceTemplateOptions {
  name: string;
  extension: "js" | "tsx";
  language: "javascript" | "typescript";
  mainFolder: string;
}

/**
 * @class ServiceTemplate
 * @extends BaseTemplate
 * @description
 * Manages the creation of service files within a project.
 * This class extends `BaseTemplate` to leverage common file system utilities and logging.
 * It encapsulates the logic for determining file paths, generating service-specific content,
 * and performing the actual file and folder creation.
 */
export class ServiceTemplate extends BaseTemplate {
  /**
   * @method createService
   * @async
   * @description
   * Orchestrates the creation of a new service file. It determines the target directory,
   * constructs the full file path, generates the initial service content,
   * ensures the service directory exists, and then creates the service file.
   * @param {ServiceTemplateOptions} options - Configuration options for the service to be created.
   * @returns {Promise<void>} A promise that resolves when the service file and its containing folder have been successfully created.
   */
  async createService(options: ServiceTemplateOptions) {
    const { name, extension, language, mainFolder } = options;

    const serviceDir = join(mainFolder, "services");
    const filePath = this.getFilePath(serviceDir, name, extension);
    const content = this.generateContent(name);

    await this.createFolder(serviceDir);
    await this.createFile(filePath, content);
  }

  /**
   * @private
   * @method generateContent
   * @description
   * Generates the boilerplate string content for a new service file.
   * Currently, the generated content is a simple export of an arrow function.
   * The `language` parameter is available for future expansion to generate
   * language-specific templates (e.g., TypeScript interfaces).
   * @param {string} name - The name of the service, used to form the function name.
   * @param {string} language - The target language for the service (e.g., "javascript", "typescript").
   * @returns {string} The string content ready to be written to the service file.
   */
  private generateContent(name: string): string {
    return `export const ${name} = () => {};`;
  }
}