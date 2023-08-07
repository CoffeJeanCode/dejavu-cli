import { Command } from "commander";
import { description, name, version } from "../../package.json";
import { commands } from "../commands";
import { Logger } from "../services/logger.service";

export class CLI extends Command {
  logger = new Logger();

  init = async (args: string[]) => {
    for (const Command of commands) {
      const command = new Command();
      command
        .register(this)
        .action(
          async (...args: any[]) =>
            await command
              .execute(args)
              .catch((err: Error) => console.error(err))
        );
    }

    return this.name(name)
      .version(version)
      .description(description)
      .on("command:*", () => {
        this.logger.error(`Invalid command: ${this.args.join(" ")}`);
        this.help();
        process.exit(1);
      })
      .parse(args);
  };
}
