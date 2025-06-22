import { Command } from "commander";
import { FileManager } from "@/services/file-manager.service";
import { Logger } from "@/services/logger.service";
import { Config, Language, TypeComponent } from "./config.model";
import { ConfigManager } from "@/services/config-manager.service";

export abstract class BaseCommand {
  protected fileManager: FileManager;
  protected configManager: ConfigManager;
  protected logger: Logger;
  protected config: Config;

  constructor() {
    this.fileManager = new FileManager();
    this.configManager = new ConfigManager();
    this.logger = new Logger();
    this.config =
      this.configManager.getConfig();
  }

  abstract execute(...args: any[]): Promise<void>;
  abstract register(program: Command): Command;
}
