import { Command } from "commander";
import { join } from "path";
import { BaseCommand } from "../models/base-command";

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

  private shouldSkipFolder = (skipFolders: string[], folderName: string) => {
    return skipFolders.includes(folderName);
  };

  private createFolder = async (folderPath: string) => {
    await this.fileManager.createDirectoryIfNotExists(folderPath);
    this.logger.success(`Created folder: ${folderPath}`);
  };

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

  execute = async (...args: any[]) => {
    const [[{ skip }]] = args;
    const { mainFolder } = this.config;
    const skipFolders = skip || [];

    await this.processFolders(mainFolder, skipFolders);
    await this.validateFolders(skipFolders, mainFolder);
  };

  register = (program: Command) =>
    program
      .command("boilerplate")
      .aliases(["boil"])
      .description("Create clean architecture folder structure")
      .option("--skip [folders...]");
}

export default BoilerplateCommand;
