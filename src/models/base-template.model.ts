import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";
import { Language } from "./config.model";
import { join } from "path";

export abstract class BaseTemplate {
  protected fileManager: FileManager;
  protected logger: Logger;

  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
  }

  protected createFile = async (filePath: string, content: string) => {
    await this.fileManager.createFileIfNotExists(filePath, content);
    this.logger.success(`Created file: ${filePath}`);
  };

  protected createFolder = async (folderPath: string) => {
    await this.fileManager.createDirectoryIfNotExists(folderPath);
    this.logger.success(`Created folder: ${folderPath}`);
  };

  protected getFilePath = (
    folderPath: string,
    fileName: string,
    extension: string
  ): string => {
    return join(folderPath, `${fileName}.${extension}`);
  };
}
