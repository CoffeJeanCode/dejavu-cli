import chalk from "chalk";

export class Logger {
  formatMessage =
    (logger: (...message: string[]) => void) =>
    (...message: string[]) =>
      logger(` ${message.join(" ")} `);

  log = (message: string) => {
    console.log(chalk.bgGray.white(message));
  };

  info = this.formatMessage((message: string) => {
    console.log(chalk.bgBlue.bold.white(message));
  });

  success = this.formatMessage((message: string) => {
    console.log(chalk.bgGreen.bold.white(message));
  });

  warn = this.formatMessage((message: string) => {
    console.log(chalk.bgYellow.bold.white(message));
  });

  error = this.formatMessage((message: string) => {
    console.error(chalk.bgRed.bold.white(message));
  });
}
