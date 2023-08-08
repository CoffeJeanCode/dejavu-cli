import { Command } from "commander";
import { BaseCommand } from "../models/base-command";

class ConfigCommand extends BaseCommand {
  constructor() {
    super();
  }

  execute = async () => {
    this.logger.info("Current CLI Configuration:");
    this.logger.info(`Language: ${this.config.language}`);
    this.logger.info(`Main Folder: ${this.config.mainFolder}`);
    this.logger.info(`Type Component: ${this.config.typeComponent}`);
  };

  register = (program: Command) =>
    program.command("config").description("View current CLI configuration");
}

export default ConfigCommand;
