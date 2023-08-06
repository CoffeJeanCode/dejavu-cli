import fs from "fs";
import { Config } from "../models/config.model";

export class FileManager {
  private configPath = "./dejavu.json";

  getConfig(): Config | null {
    try {
      const data = fs.readFileSync(this.configPath, "utf8");
      return JSON.parse(data) as Config;
    } catch (error) {
      return null;
    }
  }

  saveConfig(config: Config): void {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf8");
  }
}
