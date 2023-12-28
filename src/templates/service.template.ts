import { join } from "path";
import { BaseTemplate } from "../models/base-template.model";
import { Extension, Language } from "../models/config.model";
import { formatComponentName } from "../utils/format-component-name.util";

export class ServiceTemplate extends BaseTemplate {
  /**
   * Retrieves the template content for a service.
   *
   * @function getTemplate
   * @param {string} serviceName - The name of the service.
   * @returns {string} The template content for the service.
   */
  private getTemplate = (serviceName: string) => `
    class ${serviceName}Service {}
    
    export default ${serviceName}Service;
  `;

  /**
   * Creates a service with the specified name and configuration settings.
   *
   * @async
   * @function createService
   * @param {string} name - The name of the service.
   * @param {Language} language - The programming language to use (typescript or javascript).
   * @param {string} mainFolder - The main folder of the application.
   * @throws {Error} If an error occurs during service creation or file handling.
   */
  async createService({
    name,
    language,
    extension,
    mainFolder,
  }: {
    name: string;
    language: Language;
    extension: Extension;
    mainFolder: string;
  }): Promise<void> {
    const formattedName = formatComponentName(name);
    const servicesFolder = join(mainFolder, "services");
    const serviceFileName = `${formattedName}.${extension}`;
    const serviceFilePath = this.getFilePath(
      servicesFolder,
      formattedName,
      extension
    );

    try {
      this.fileManager.createDirectoryIfNotExists(servicesFolder);

      if (await this.fileManager.exists(serviceFilePath)) {
        this.logger.info(`Service ${formattedName} already exists`);
        return;
      }

      const serviceContent = this.getTemplate(formattedName);
      await this.createFile(serviceFilePath, serviceContent);

      this.logger.success(`Service ${formattedName} created`);
    } catch (error) {
      this.logger.error("Error creating service:", String(error));
    }
  }
}
