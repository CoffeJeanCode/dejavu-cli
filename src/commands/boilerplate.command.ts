import { Command } from "commander";
import { join } from "path";
import { BaseCommand } from "../models/base-command.model";

/**
 * Represents a command to create a clean architecture folder structure.
 *
 * This command creates a folder structure based on a predefined architecture,
 * excluding specified folders if required.
 *
 * @class
 * @extends BaseCommand
 */
class BoilerplateCommand extends BaseCommand {
  private readonly foldersArchitecture = [
    "api",
    "services",
    "components",
    "pages",
    "hooks",
    "store",
    "styles",
    "models",
  ];

  constructor() {
    super();
  }

  /**
   * Checks if a folder should be skipped during creation.
   *
   * @function shouldSkipFolder
   * @param {string[]} skipFolders - An array of folder names to skip.
   * @param {string} folderName - The name of the folder to check.
   * @returns {boolean} Returns true if the folder should be skipped, otherwise false.
   */
  private shouldSkipFolder = (skipFolders: string[], folderName: string) => {
    return skipFolders.includes(folderName);
  };

  /**
   * Creates a folder at the specified path.
   *
   * @async
   * @function createFolder
   * @param {string} folderPath - The path where the folder should be created.
   * @throws {Error} If an error occurs during folder creation.
   */
  private createFolder = async (folderPath: string) => {
    await this.fileManager.createDirectoryIfNotExists(folderPath);
    this.logger.success(`Created folder: ${folderPath}`);
  };

  /**
   * Processes folders to create the clean architecture structure.
   *
   * @async
   * @function processFolders
   * @param {string} mainFolder - The main folder where the architecture structure should be created.
   * @param {string[]} skipFolders - An array of folder names to skip.
   * @throws {Error} If an error occurs during folder creation.
   */
  private processFolders = async (
    mainFolder: string,
    skipFolders: string[]
  ) => {
    for (const folderName of this.foldersArchitecture) {
      if (!this.shouldSkipFolder(skipFolders, folderName)) {
        const folderPath = join(mainFolder, folderName);
        await this.createFolder(folderPath);
      } else this.logger.info(`Skip Folder: ${folderName}`);
    }
  };

  /**
   * Validates skipped folders to ensure they exist.
   *
   * @async
   * @function validateFolders
   * @param {string[]} foldersToSkip - An array of folder names to skip.
   * @param {string} mainFolder - The main folder where the architecture structure should be created.
   */
  private validateFolders = async (
    foldersToSkip: string[],
    mainFolder: string
  ) => {
    for (const folderToSkip of foldersToSkip) {
      const folderPath = join(mainFolder, folderToSkip);
      if (!(await this.fileManager.exists(folderPath))) {
        this.logger.warn(`Folder not found: ${folderPath}`);
      }
    }
  };

  /**
   * Executes the boilerplate command to create the architecture structure.
   *
   * @async
   * @function execute
   * @param {...any[]} args - Command arguments and options.
   */
  execute = async (...args: any[]) => {
    const [[{ skip }]] = args;
    const { mainFolder } = this.config;
    const skipFolders = skip || [];

    await this.processFolders(mainFolder, skipFolders);
    await this.validateFolders(skipFolders, mainFolder);
  };

  /**
   * Registers the "boilerplate" command with the provided Commander program.
   *
   * @function register
   * @param {Command} program - The Commander program instance.
   */
  register = (program: Command) =>
    program
      .command("boilerplate")
      .aliases(["boil"])
      .description("Create clean architecture folder structure")
      .option(
        "--skip [folders...]",
        `Folder structure: ${this.foldersArchitecture.join("/ ")}`
      );
}

export default BoilerplateCommand;
