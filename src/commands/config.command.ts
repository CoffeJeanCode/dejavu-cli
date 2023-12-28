import { Command } from "commander";
import { BaseCommand } from "../models/base-command.model";
import { Config } from "../models/config.model";

/**
 * Represents a command to view the current CLI configuration.
 *
 * This command retrieves and displays the current configuration settings of the CLI.
 *
 * @class
 * @extends BaseCommand
 */
class ConfigCommand extends BaseCommand {
  constructor() {
    super();
  }

  /**
   * Executes the command to display the current CLI configuration.
   *
   * @async
   * @function execute
   */
  execute = async () => {
    this.logger.info("Current CLI Configuration:");
    Object.keys(this.config).forEach((key) => {
      const value = this.config[key as keyof Config];
      this.logger.info(`${key}: ${value}`);
    });
  };

  /**
   * Registers the command with Commander to view the CLI configuration.
   *
   * @function register
   * @param {Command} program - The Commander program instance.
   * @returns {Command} The configured Commander program instance.
   */
  register = (program: Command) =>
    program.command("config").description("View current CLI configuration");
}

export default ConfigCommand;
