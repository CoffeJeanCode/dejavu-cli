import chalk from "chalk";

export class Logger {
  formatMessage = (logger: (message: string) => void) => (message: string) =>
    logger(` ${message} `);

  log = this.formatMessage((message: string) => {
    console.log(message);
  });

  error = this.formatMessage((message: string) => {
    console.error(chalk.bgRed.bold.white(message));
  });
}
