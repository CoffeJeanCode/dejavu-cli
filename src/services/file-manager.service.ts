import fs from "fs";
import { Config } from "../models/config.model";

export class FileManager {
  private configPath = "./dejavu.json";

  getConfig = (): Config | null => {
    try {
      const data = fs.readFileSync(this.configPath, "utf8");
      return JSON.parse(data) as Config;
    } catch (error) {
      return null;
    }
  };

  saveConfig = (config: Config): void => {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf8");
  };

  exists = (path: string): Promise<boolean> =>
    new Promise((resolve) => {
      fs.access(path, fs.constants.F_OK, (error) => {
        resolve(!error);
      });
    });

  readFile = (path: string): Promise<string> =>
    new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });

  writeFile = (path: string, content: string): Promise<void> =>
    new Promise((resolve, reject) => {
      fs.writeFile(path, content, "utf8", (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

  createDirectoryIfNotExists = (path: string): Promise<void> =>
    new Promise((resolve, reject) => {
      this.exists(path).then((exists) => {
        if (!exists) {
          fs.mkdir(path, { recursive: true }, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });

  createFileIfNotExists = (path: string, content: string): Promise<void> =>
    new Promise((resolve, reject) => {
      this.exists(path).then((exists) => {
        if (!exists) {
          fs.writeFile(path, content, "utf8", (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
}
