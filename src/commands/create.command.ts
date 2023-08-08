import { Command } from "commander";
import { BaseCommand } from "../models/base-command";
import { ComponentTemplate } from "../templates/component.template";
import { match } from "../utils/pattern-match.util";

/**
 * Represents a command to create various application components.
 *
 * This command supports creating components, hooks, and services based on user input.
 * The command is flexible and accepts multiple aliases for each component type.
 *
 * @class
 * @extends BaseCommand
 */
class CreateCommand extends BaseCommand {
  private componentTemplate: ComponentTemplate;

  constructor() {
    super();
    this.componentTemplate = new ComponentTemplate();
  }

  /**
   * Creates components based on provided names.
   *
   * This method creates components based on the specified component type, language,
   * and main folder. It creates the necessary directories and files for each component.
   *
   * @async
   * @function createComponent
   * @param {string[]} names - The names of the components to create.
   * @throws {Error} If an error occurs during component creation or file handling.
   */
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

  /**
   * Creates hooks based on provided names.
   *
   * @function createHook
   * @param {string[]} names - The names of the hooks to create.
   * @todo Implement the logic to create hooks.
   */
  createHook = (names: string[]) => {
    // Implement the logic to create a hook
    // Use this.fileManager and this.logger for file handling and logging
  };

  /**
   * Creates services based on provided names.
   *
   * @function createService
   * @param {string[]} names - The names of the services to create.
   * @todo Implement the logic to create services.
   */
  createService = (names: string[]) => {
    // Implement the logic to create a service
    // Use this.fileManager and this.logger for file handling and logging
  };

  /**
   * Executes the create command based on the specified type and names.
   *
   * This method matches the provided type with the corresponding creation logic,
   * then executes the relevant creation method with the provided names.
   *
   * @async
   * @function execute
   * @param {any[]} [type, names] - The type of component to create and the names of the components.
   */
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

  /**
   * Registers the "create" command with the provided Commander program.
   *
   * @function register
   * @param {Command} program - The Commander program instance.
   */
  register = (program: Command) =>
    program
      .command("create ")
      .argument("[type]")
      .argument("[names...]")
      .aliases(["c"])
      .description("Create components");
}

export default CreateCommand;
