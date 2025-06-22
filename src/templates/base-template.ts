import { FileManager } from "@/services/file-manager.service";
import { Logger } from "@/services/logger.service";
import path from "path";

/**
 * @abstract
 * @class BaseTemplate
 * @description
 * An abstract base class that provides common functionalities for file management
 * and logging within the context of creating or manipulating templates
 * or file structures.
 *
 * This class encapsulates the logic for interacting with `FileManager` and `Logger`,
 * offering protected methods for creating files and folders, and for
 * obtaining file paths. This design facilitates reuse in derived classes
 * that require these basic operations.
 */
export abstract class BaseTemplate {
  /**
   * @protected
   * @property {FileManager} fileManager
   * @description
   * An instance of the `FileManager` service used to perform file system operations
   * such as creating, reading, writing, or deleting files and directories.
   */
  protected fileManager: FileManager;

  /**
   * @protected
   * @property {Logger} logger
   * @description
   * An instance of the `Logger` service used to log informational,
   * success, warning, or error messages during operation execution.
   */
  protected logger: Logger;

  /**
   * @constructor
   * @description
   * Initializes a new instance of `BaseTemplate`.
   * During construction, instances of `FileManager` and `Logger` are created
   * and assigned to their respective properties.
   */
  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
  }

  /**
   * @protected
   * @method createFile
   * @description
   * Creates a file at the specified path with the provided content.
   * It uses the `fileManager` for the write operation and the `logger`
   * to record a success message.
   * @param {string} filePath - The full path, including the file name and extension, where the file will be created.
   * @param {string} content - The content to be written to the file.
   * @returns {Promise<void>} A promise that resolves once the file has been created and the log recorded.
   */
  protected createFile = async (filePath: string, content: string) => {
    await this.fileManager.createFile(filePath, content);
    this.logger.success(`Created file: ${filePath}`);
  };

  /**
   * @protected
   * @method createFolder
   * @description
   * Creates a directory (folder) at the specified path.
   * It uses the `fileManager` for the directory creation operation and the `logger`
   * to record a success message.
   * @param {string} folderPath - The full path where the folder will be created.
   * @returns {Promise<void>} A promise that resolves once the folder has been created and the log recorded.
   */
  protected createFolder = async (folderPath: string) => {
    await this.fileManager.createDirectory(folderPath);
    this.logger.success(`Created folder: ${folderPath}`);
  };

  /**
   * @protected
   * @method getFilePath
   * @description
   * Generates a complete file path by joining the folder path, file name,
   * and its extension. It uses Node.js's `path` module to ensure
   * cross-operating system compatibility.
   * @param {string} folderPath - The path to the directory where the file is located or will be created.
   * @param {string} fileName - The name of the file (without extension).
   * @param {string} extension - The file's extension (e.g., "ts", "js", "json").
   * @returns {string} The complete and normalized file path.
   */
  protected getFilePath = (
    folderPath: string,
    fileName: string,
    extension: string
  ): string => {
    return path.join(folderPath, `${fileName}.${extension}`);
  };
}