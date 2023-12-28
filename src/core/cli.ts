import { Command } from "commander";
import { description, name, version } from "../../package.json";
import { commands } from "../commands";
import { Logger } from "../services/logger.service";

/**
 * Extends the Commander Command class to create a command-line interface for the application.
 *
 * This class sets up the CLI by initializing commands, specifying version, description,
 * and handling invalid command cases.
 *
 * @class
 * @extends Command
 */
export class CLI extends Command {
  /**
   * Logger instance for handling logging within the CLI.
   */
  logger = new Logger();

  /**
   * Initializes the command-line interface with provided arguments.
   *
   * This method iterates through the available commands, registers them with the CLI,
   * and sets up their action functions. It also sets the application's name, version,
   * and description. Additionally, it handles cases where an invalid command is provided.
   *
   * @async
   * @function init
   * @param {string[]} args - The command-line arguments provided to the application.
   * @throws {Error} If an error occurs during command execution or initialization.
   */
  init = async (args: string[]) => {
    this.logger.title("DejaVu");
    for (const Command of commands) {
      const command = new Command();
      command
        .register(this)
        .action(
          async (...args: any[]) =>
            await command
              .execute(args)
              .catch((err: Error) => this.logger.error(err.message))
        );
    }

    return this.name(name)
      .version(version)
      .description(description)
      .alias("vu")
      .on("command:*", () => {
        this.logger.error(`Invalid command: ${this.args.join(" ")}`);
        this.help();
        process.exit(1);
      })
      .parse(args);
  };
}
