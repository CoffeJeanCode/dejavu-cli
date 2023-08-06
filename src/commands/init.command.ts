import inquirer, { QuestionCollection } from "inquirer";
import { BaseCommand } from "../models/base-command";
import { Config } from "../models/config.model";

class InitCommand extends BaseCommand {
  constructor() {
    super();
    this.name = "init";
    this.description = "Configure the CLI with dejavu.json";
  }

  execute = async () => {
    const questions: QuestionCollection = [
      {
        type: "list",
        name: "language",
        message: "Introduce app language:",
        choices: [
          { name: "Javascript", value: "javascript" },
          { name: "Typsecript", value: "typescript" },
        ],
      },
      {
        type: "input",
        name: "rootFolder",
        message: "Introduce root folder:",
        default: "src",
      },
    ];

    const answers = await inquirer.prompt(questions);
    const config: Config = {
      language: answers.language,
      rootFolder: answers.rootFolder,
    };

    this.fileManager.saveConfig(config);
    this.logger.success("Configuration saved successfully");
  };
}

export default InitCommand;
