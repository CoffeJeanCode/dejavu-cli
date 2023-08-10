import fs from "fs";
import {
  Config,
  ConfigFile,
  Extension,
  Language,
  TypeComponent,
} from "../models/config.model";

/**
 * A utility class for managing file operations.
 *
 * This class provides methods to interact with the file system, such as reading
 * and writing files, checking if a file or directory exists, and creating directories
 * and files if they do not exist.
 *
 * @class
 */
export class FileManager {
  private configPath = "./dejavu.json";

  /**
   * Retrieves the configuration from a JSON file.
   *
   * This method reads the contents of the configuration file at the specified path,
   * parses it as JSON, and returns the parsed configuration.
   *
   * @function getConfig
   * @returns {Config} The parsed configuration object, or default config if an error occurs.
   */
  getConfig = (): Config => {
    try {
      const data = fs.readFileSync(this.configPath, "utf8");
      const configFile = JSON.parse(data) as ConfigFile;
      const config: Config = {
        ...configFile,
        extension:
          configFile.language === Language.javascript
            ? Extension.js
            : Extension.tsx,
      };

      return config;
    } catch (error) {
      return {
        language: Language.javascript,
        mainFolder: "src",
        typeComponent: TypeComponent.barrel,
        extension: Extension.js,
      } as Config;
    }
  };

  /**
   * Saves a configuration object to a JSON file.
   *
   * This method serializes the provided configuration object as JSON and writes it to
   * the configuration file at the specified path.
   *
   * @function saveConfig
   * @param {Config} config - The configuration object to be saved.
   */
  saveConfig = (config: ConfigFile): void => {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf8");
  };

  /**
   * Checks if a file or directory exists at the specified path.
   *
   * @async
   * @function exists
   * @param {string} path - The path to the file or directory to check.
   * @returns {Promise<boolean>} A promise that resolves to true if the file or directory exists, otherwise false.
   */
  exists = (path: string): Promise<boolean> =>
    new Promise((resolve) => {
      fs.access(path, fs.constants.F_OK, (error) => {
        resolve(!error);
      });
    });

  /**
   * Reads the contents of a file.
   *
   * @async
   * @function readFile
   * @param {string} path - The path to the file to read.
   * @returns {Promise<string>} A promise that resolves to the content of the file as a string.
   */
  readFile = (path: string): Promise<string> =>
    new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });

  /**
   * Writes content to a file.
   *
   * @async
   * @function writeFile
   * @param {string} path - The path to the file to write.
   * @param {string} content - The content to write to the file.
   * @returns {Promise<void>} A promise that resolves once the content is successfully written.
   */
  writeFile = (path: string, content: string): Promise<void> =>
    new Promise((resolve, reject) => {
      fs.writeFile(path, content, "utf8", (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

  /**
   * Creates a directory if it does not already exist.
   *
   * @async
   * @function createDirectoryIfNotExists
   * @param {string} path - The path to the directory to create.
   * @returns {Promise<void>} A promise that resolves once the directory is created or if it already exists.
   */
  createDirectoryIfNotExists = (path: string): Promise<void> =>
    new Promise((resolve, reject) => {
      this.exists(path).then((exists) => {
        if (!exists) {
          fs.mkdir(path, { recursive: true }, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });

  /**
   * Creates a file if it does not already exist and writes content to it.
   *
   * @async
   * @function createFileIfNotExists
   * @param {string} path - The path to the file to create.
   * @param {string} content - The content to write to the file.
   * @returns {Promise<void>} A promise that resolves once the file is created with the specified content.
   */
  createFileIfNotExists = (path: string, content: string): Promise<void> =>
    new Promise((resolve, reject) => {
      this.exists(path).then((exists) => {
        if (!exists) {
          fs.writeFile(path, content, "utf8", (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
}
