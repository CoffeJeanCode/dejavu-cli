import { Command } from "commander";
import { glob } from "glob";
import { resolve } from "path";
import { description, name, version } from "../../package.json";
import { Logger } from "../services/logger.service";

export class CLI extends Command {
  logger = new Logger();

  init = async (args: string[]) => {
    const commandFiles = glob.sync("./src/commands/*.ts");

    for (const file of commandFiles) {
      const { default: CommandClass } = await import(resolve(file));
      const command = new CommandClass();
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
