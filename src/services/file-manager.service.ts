import fs from "fs";
import path from "path";

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
  /**
   * Checks if a file or directory exists at the specified path.
   *
   * @param {string} targetPath - The path to the file or directory.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the file or directory exists, `false` otherwise.
   */
  exists = async (targetPath: string): Promise<boolean> => {
    return fs.promises
      .access(targetPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Reads the content of a file.
   *
   * @param {string} filePath - The path to the file to read.
   * @returns {Promise<string>} A promise that resolves with the content of the file as a UTF-8 string.
   */
  readFile = async (filePath: string): Promise<string> => {
    return fs.promises.readFile(filePath, 'utf8');
  }

  /**
   * Writes content to a file. If the file does not exist, it will be created.
   * If it exists, its content will be overwritten.
   *
   * @param {string} filePath - The path to the file to write.
   * @param {string} content - The content to write to the file.
   * @returns {Promise<void>} A promise that resolves when the file has been written.
   */
  writeFile = async (filePath: string, content: string): Promise<void> => {
    await fs.promises.writeFile(filePath, content, 'utf8');
  }

  /**
   * Creates a directory at the specified path. If the directory already exists,
   * no action is taken. Parent directories will be created if they don't exist.
   *
   * @param {string} dirPath - The path of the directory to create.
   * @returns {Promise<void>} A promise that resolves when the directory has been created.
   */
  createDirectory = async (dirPath: string): Promise<void> => {
    const exists = await this.exists(dirPath);
    if (!exists) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
  }

  /**
   * Creates an empty file at the specified path if it doesn't already exist.
   * If the file exists, its content is not modified.
   *
   * @param {string} filePath - The path to the file to create.
   * @param {string} [content=''] - Optional content to write to the file if it's created. Defaults to an empty string.
   * @returns {Promise<void>} A promise that resolves when the file has been created or confirmed to exist.
   */
  createFile = async (filePath: string, content = ''): Promise<void> => {
    const exists = await this.exists(filePath);
    if (!exists) {
      await this.writeFile(filePath, content);
    }
  }

  /**
   * Ensures that a directory exists and then creates a file within it if the file doesn't already exist.
   * Parent directories will be created if they don't exist.
   *
   * @param {string} dirPath - The path to the directory.
   * @param {string} fileName - The name of the file to create within the directory.
   * @param {string} [content=''] - Optional content to write to the file if it's created. Defaults to an empty string.
   * @returns {Promise<void>} A promise that resolves when the directory and file have been ensured.
   */
  prepareFileInDirectory = async (dirPath: string, fileName: string, content = ''): Promise<void> => {
    await this.createDirectory(dirPath);
    const fullPath = path.join(dirPath, fileName);
    await this.createFile(fullPath, content);
  }
}