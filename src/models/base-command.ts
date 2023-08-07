import { Command } from "commander";
import { FileManager } from "../services/file-manager.service";
import { Logger } from "../services/logger.service";
import { Config, Language, TypeComponent } from "./config.model";

export abstract class BaseCommand {
  protected fileManager: FileManager;
  protected logger: Logger;
  protected config: Config;

  constructor() {
    this.fileManager = new FileManager();
    this.logger = new Logger();
    this.config =
      this.fileManager.getConfig() ||
      ({
        language: Language.javascript,
        mainFolder: "src",
        typeComponent: TypeComponent.barrel,
      } as Config);
  }

  abstract execute(...args: any[]): Promise<void>;
  abstract register(program: Command): void;
}
