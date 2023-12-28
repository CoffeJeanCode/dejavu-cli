import { Command } from "commander";
import inquirer, { QuestionCollection } from "inquirer";
import { BaseCommand } from "../models/base-command.model";
import { Config, ConfigFile } from "../models/config.model";

/**
 * Represents a command to initialize the application's configuration.
 *
 * This command prompts the user to configure settings such as app language, type of component,
 * and root folder. It saves the configuration to a file and creates the specified root folder.
 *
 * @class
 * @extends BaseCommand
 */
class InitCommand extends BaseCommand {
  constructor() {
    super();
  }

  /**
   * Executes the initialization process.
   *
   * This method prompts the user to input configuration options. It checks if a configuration
   * already exists and provides the option to overwrite it. The user's answers are then used
   * to create a configuration object, which is saved to a file and used to create the root folder.
   *
   * @async
   * @function execute
   * @throws {Error} If an error occurs during file operations or configuration prompts.
   */
  execute = async () => {
    const existingConfig = this.fileManager.getConfig();

    if (existingConfig) {
      const overwriteQuestion: QuestionCollection = [
        {
          type: "confirm",
          name: "overwrite",
          message:
            "A configuration already exists. Do you want to overwrite it?",
          default: false,
        },
      ];

      const overwriteAnswer = await inquirer.prompt(overwriteQuestion);

      if (!overwriteAnswer.overwrite) {
        this.logger.info("Configuration not overwritten. Exiting...");
        return;
      }
    }

    const questions: QuestionCollection = [
      {
        type: "list",
        name: "language",
        message: "Introduce app language:",
        choices: [
          { name: "Javascript", value: "js" },
          { name: "Typsecript", value: "ts" },
        ],
      },
      {
        type: "list",
        name: "typeComponent",
        message: "Introduce type component:",
        choices: [
          { name: "Barrel", value: "barrel" },
          { name: "File", value: "file" },
        ],
      },
      {
        type: "input",
        name: "mainFolder",
        message: "Introduce root folder:",
        default: "src",
      },
    ];

    const answers = await inquirer.prompt(questions);
    const config: ConfigFile = {
      language: answers.language,
      mainFolder: answers.mainFolder,
      typeComponent: answers.typeComponent,
    };

    this.fileManager.saveConfig(config);
    this.fileManager.createDirectoryIfNotExists(config.mainFolder);
    this.logger.success("Configuration saved successfully");
  };

  /**
   * Registers the "init" command with the provided Commander program.
   *
   * @function register
   * @param {Command} program - The Commander program instance.
   */
  register = (program: Command) =>
    program.command("init").description("Configure file dejavu.json");
}

export default InitCommand;
