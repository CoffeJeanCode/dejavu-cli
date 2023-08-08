#!/usr/bin/env node
import { CLI } from "./core/cli";

/**
 * Entry point of the application.
 *
 * This script serves as the starting point for the command-line application.
 * It imports the CLI class from the "./core/cli" module and initializes it
 * with the provided command-line arguments.
 *
 * @async
 * @function main
 * @throws {Error} If an error occurs during application initialization.
 * @returns {Promise<void>} A promise that resolves once the application has finished.
 */
const main = async () => {
  try {
    await new CLI().init(process.argv);
  } catch (err) {
    console.error(err);
  }
};

// Call the main function to start the application
main().catch((err) => console.error(err));
