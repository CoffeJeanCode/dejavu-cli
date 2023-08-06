import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";

export abstract class BaseCommand {
  protected fileManager: FileManager;
  protected logger: Logger;
  public name: string;
  public description: string;

  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
    this.name = "";
    this.description = "";
  }

  abstract execute(...args: any[]): Promise<void>;
}
