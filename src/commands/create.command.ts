import { Command } from "commander";
import { BaseCommand } from "../models/base-command";
import { ComponentTemplate } from "../templates/component.template";
import { match } from "../utils/pattern-match.util";

class CreateCommand extends BaseCommand {
  private componentTemplate: ComponentTemplate;

  constructor() {
    super();
    this.componentTemplate = new ComponentTemplate();
  }

  createComponent = async (names: string[]) => {
    const { mainFolder, typeComponent, language } = this.config;
    const componentFolder = `${mainFolder}/components`;

    try {
      this.fileManager.createDirectoryIfNotExists(componentFolder);
      for (const name of names) {
        await this.componentTemplate.createComponent(
          name,
          typeComponent,
          language,
          mainFolder
        );
      }
    } catch (error) {
      this.logger.error("Error creating components:", String(error));
    }
  };

  createHook = (names: string[]) => {
    // Implement the logic to create a hook
    // Use this.fileManager and this.logger for file handling and logging
  };

  createService = (names: string[]) => {
    // Implement the logic to create a service
    // Use this.fileManager and this.logger for file handling and logging
  };

  execute = async ([type, names]: any) => {
    if (names.length === 0) {
      this.logger.warn("Put names to files");
      process.exit(0);
    }

    const result = match<string, void>(
      type,
      [["component", "comp", "c"], this.createComponent],
      [["hook", "hk"], this.createHook],
      [["service", "svc"], this.createService]
    )(...names);

    if (result === null) this.logger.error("Invalid type");
  };

  register = (program: Command) =>
    program
      .command("create ")
      .argument("[type]")
      .argument("[names...]")
      .aliases(["c"])
      .description("Create components");
}

export default CreateCommand;
