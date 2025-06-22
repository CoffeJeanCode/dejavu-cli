import fs from 'fs';
import { Config, ConfigFile, ExtensionMap, Language, TypeComponent } from '@/models/config.model';

/**
 * Manages the application's configuration, including reading from and writing to a `dejavu.json` file.
 *
 * This class handles the logic for retrieving configuration settings, validating their structure,
 * and providing a fallback default configuration if the file is missing or invalid.
 * It also supports saving updated configuration settings back to the file.
 *
 * @class
 */
export class ConfigManager {
  /**
   * The path to the configuration file.
   * @private
   * @readonly
   */
  private readonly configPath = './dejavu.json';

  /**
   * Retrieves the application's configuration from `dejavu.json`.
   *
   * If the `dejavu.json` file is not found, or if its structure is invalid (missing `language`, `mainFolder`, or `typeComponent`),
   * a default configuration will be returned.
   *
   * @returns {Config} A promise that resolves with the application's configuration.
   */
  getConfig(): Config {
    try {
      const data = fs.readFileSync(this.configPath, 'utf8');
      const configFile: ConfigFile = JSON.parse(data);

      if (!configFile.language || !configFile.mainFolder || !configFile.typeComponent) {
        throw new Error('Invalid config structure');
      }

      const extension = ExtensionMap[configFile.language];

      return {
        ...configFile,
        extension,
      };
    } catch {
      // fallback default config
      return {
        language: Language.JavaScript,
        mainFolder: 'src',
        typeComponent: TypeComponent.barrel,
        extension: ExtensionMap[Language.JavaScript],
      };
    }
  }

  /**
   * Saves the provided configuration to the `dejavu.json` file.
   * The JSON output will be formatted with a 2-space indentation for readability.
   *
   * @param {ConfigFile} config - The configuration object to save.
   * @returns {Promise<void>} A promise that resolves when the configuration has been successfully written to the file.
   */
  async saveConfig(config: ConfigFile): Promise<void> {
    const json = JSON.stringify(config, null, 2);
    await fs.promises.writeFile(this.configPath, json, 'utf8');
  }
}