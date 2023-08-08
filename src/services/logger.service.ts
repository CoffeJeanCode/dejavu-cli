import chalk from "chalk";

/**
 * A utility class for formatting and displaying colored log messages in the console.
 *
 * This class provides methods to format log messages with different colors and backgrounds
 * based on the type of message (log, info, success, warn, error).
 *
 * @class
 */
export class Logger {
  /**
   * Formats a log message by adding spaces around it.
   *
   * This higher-order function is used to create formatted log message functions
   * for various types of messages.
   *
   * @function formatMessage
   * @param {(...message: string[]) => void} logger - The logger function to use for output.
   * @returns {(...message: string[]) => void} A formatted message logger function.
   */
  formatMessage =
    (logger: (...message: string[]) => void) =>
    (...message: string[]) =>
      logger(` ${message.join(" ")} `);

  /**
   * Logs a generic message to the console with a gray background and white text.
   *
   * @function log
   * @param {string} message - The message to be logged.
   */
  log = (message: string) => {
    console.log(chalk.bgGray.white(message));
  };

  /**
   * Logs an informational message to the console with a blue background, bold white text.
   *
   * @function info
   * @param {string} message - The informational message to be logged.
   */
  info = this.formatMessage((message: string) => {
    console.log(chalk.bgBlue.bold.white(message));
  });

  /**
   * Logs a success message to the console with a green background, bold white text.
   *
   * @function success
   * @param {string} message - The success message to be logged.
   */
  success = this.formatMessage((message: string) => {
    console.log(chalk.bgGreen.bold.white(message));
  });

  /**
   * Logs a warning message to the console with a yellow background, bold white text.
   *
   * @function warn
   * @param {string} message - The warning message to be logged.
   */
  warn = this.formatMessage((message: string) => {
    console.log(chalk.bgYellow.bold.black(message));
  });

  /**
   * Logs an error message to the console with a red background, bold white text.
   *
   * @function error
   * @param {string} message - The error message to be logged.
   */
  error = this.formatMessage((message: string) => {
    console.error(chalk.bgRed.bold.white(message));
  });
}
