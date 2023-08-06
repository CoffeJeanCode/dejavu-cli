import { Command } from "commander";
import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";

export abstract class BaseCommand {
  protected fileManager: FileManager;
  protected logger: Logger;

  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
  }

  abstract execute(): Promise<void>;

  abstract register(program: Command): void;
}
