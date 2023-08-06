import { Command } from "commander";
import { glob } from "glob";
import { resolve } from "path";
import { description, name, version } from "../../package.json";
import { BaseCommand } from "../models/base-command";
import { Logger } from "../services/logger.service";

export class CLI extends Command {
  logger = new Logger();

  init = async (args: string[]) => {
    const commandFiles = glob.sync("./src/commands/*.ts");
    commandFiles.forEach(async (file) => {
      const { default: CommandClass } = await import(resolve(file));
      const command = new CommandClass();
      if (command instanceof BaseCommand) command.register(this);
    });

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
