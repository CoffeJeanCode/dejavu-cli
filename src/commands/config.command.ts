import { Command } from "commander";
import { BaseCommand } from "../models/base-command";
import { Config } from "../models/config.model";

class ConfigCommand extends BaseCommand {
  constructor() {
    super();
  }

  execute = async () => {
    this.logger.info("Current CLI Configuration:");
    Object.keys(this.config).forEach((key) => {
      const value = this.config[key as keyof Config];
      this.logger.info(`${key}: ${value}`);
    });
  };

  register = (program: Command) =>
    program.command("config").description("View current CLI configuration");
}

export default ConfigCommand;
