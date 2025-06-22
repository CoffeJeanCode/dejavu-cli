import { Command } from "commander";
import { BaseCommand } from "@/models/base-command.model";
import { join } from "path";
import { ComponentTemplate } from "@/templates/component.template";
import { PageTemplate } from "@/templates/page.template";
import { ServiceTemplate } from "@/templates/service.template";
import { HookTemplate } from "@/templates/hook.template";
import { match } from "@/utils/pattern-match.util";

/**
 * Represents a command to create various application components.
 * This command supports creating components, hooks, services, and pages.
 *
 * @class
 * @extends BaseCommand
 */
class CreateCommand extends BaseCommand {
  private componentTemplate: ComponentTemplate;
  private pageTemplate: PageTemplate;
  private serviceTemplate: ServiceTemplate;
  private hookTemplate: HookTemplate;

  private types = {
    components: ["component", "comp", "c"],
    hooks: ["hook", "hk"],
    services: ["service", "sv", "s"],
    pages: ["page", "pg", "p"],
  };

  constructor() {
    super();
    this.componentTemplate = new ComponentTemplate();
    this.pageTemplate = new PageTemplate();
    this.serviceTemplate = new ServiceTemplate();
    this.hookTemplate = new HookTemplate();
  }

  getAllTypes = () => Object.values(this.types);

  /**
   * Create components using the ComponentTemplate.
   */
  createComponent = async (names: string[]) => {
    const { mainFolder, typeComponent, language, extension } = this.config;
    const componentFolder = join(mainFolder, "components");

    try {
      this.fileManager.createDirectory(componentFolder);
      for (const name of names) {
        await this.componentTemplate.createComponent({
          name,
          typeComponent,
          extension,
          language,
          mainFolder,
        });
      }
    } catch (error) {
      this.logger.error("Error creating components:", String(error));
    }
  };

  /**
   * Create hooks using the HookTemplate.
   */
  createHook = async (names: string[]) => {
    const { mainFolder, extension, language } = this.config;
    const hookFolder = join(mainFolder, "hooks");

    try {
      this.fileManager.createDirectory(hookFolder);
      for (const name of names) {
        await this.hookTemplate.createHook({
          name,
          language,
          extension,
          mainFolder,
        });
      }
    } catch (error) {
      this.logger.error("Error creating hooks:", String(error));
    }
  };

  /**
   * Create services using the ServiceTemplate.
   */
  createService = async (names: string[]) => {
    const { mainFolder, extension, language } = this.config;
    const serviceFolder = join(mainFolder, "services");

    try {
      this.fileManager.createDirectory(serviceFolder);
      for (const name of names) {
        await this.serviceTemplate.createService({
          name,
          language,
          extension,
          mainFolder,
        });
      }
    } catch (error) {
      this.logger.error("Error creating services:", String(error));
    }
  };

  /**
   * Create pages using the PageTemplate.
   */
  createPages = async (names: string[]) => {
    const { mainFolder, extension, language } = this.config;
    const pageFolder = join(mainFolder, "pages");

    try {
      this.fileManager.createDirectory(pageFolder);
      for (const name of names) {
        await this.pageTemplate.createPage({
          name,
          language,
          extension,
          mainFolder,
        });
      }
    } catch (error) {
      this.logger.error("Error creating pages:", String(error));
    }
  };

  /**
   * Executes the create command based on type and names.
   */
  execute = async ([type, names]: [string, string[]]) => {
    if (!names || names.length === 0) {
      this.logger.warn("Please provide one or more names.");
      process.exit(0);
    }

    const { components, hooks, services, pages } = this.types;

    const result = match<string, void>(
      type,
      [components, this.createComponent],
      [hooks, this.createHook],
      [services, this.createService],
      [pages, this.createPages]
    )(...names);

    await this.fileManager.createDirectory(this.config.mainFolder);

    if (result === null) {
      this.logger.error("Invalid type provided.");
    }
  };

  /**
   * Registers the "create" command with Commander.
   */
  register = (program: Command) =>
    program
      .command("create")
      .argument(
        "[type]",
        `Type of file to create, options: ${this.getAllTypes()
          .map((types) => types.join(" / "))
          .join(" | ")}`
      )
      .argument("[names...]")
      .aliases(["c"])
      .description("Create components, hooks, services, or pages.")
      .action(this.execute);
}

export default CreateCommand;
