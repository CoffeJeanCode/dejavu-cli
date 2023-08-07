import { Command } from "commander";
import inquirer, { QuestionCollection } from "inquirer";
import { BaseCommand } from "../models/base-command";
import { Config } from "../models/config.model";

class InitCommand extends BaseCommand {
  constructor() {
    super();
  }

  execute = async () => {
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
    const config: Config = {
      language: answers.language,
      mainFolder: answers.mainFolder,
      typeComponent: answers.typeComponent,
    };

    this.fileManager.saveConfig(config);
    this.logger.success("Configuration saved successfully");
  };

  register = (program: Command) =>
    program.command("init").description("Configure file dejavu.json");
}

export default InitCommand;
