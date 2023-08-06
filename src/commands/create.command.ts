import { Command } from "commander";
import { BaseCommand } from "../models/base-command";
import { match } from "../utils/pattern-match.util";

class CreateCommand extends BaseCommand {
  constructor() {
    super();
  }

  createComponent = async (names: string[]) => {
    const config = this.fileManager.getConfig();
    const mainFolder = config?.rootFolder || "src";
    const componentFolder = `${mainFolder}/components`;

    try {
      const folderExists = await this.fileManager.exists(componentFolder);
      if (!folderExists) {
        await this.fileManager.createDirectory(componentFolder);
      }

      for (const name of names) {
        const componentPath = `${componentFolder}/${name}.js`;
        const componentContent = `const ${name} = () => {\n  return <div>${name} component</div>;\n};\n\nexport default ${name};\n`;

        await this.fileManager.writeFile(componentPath, componentContent);
        this.logger.success(`Component ${name} created at ${componentPath}`);
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
    const result = match<string, void>(
      type,
      ["component", this.createComponent],
      ["hook", this.createHook],
      ["service", this.createService]
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
