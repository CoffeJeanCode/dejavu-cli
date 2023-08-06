#!/usr/bin/env node
import { CLI } from "./core/cli";

const main = async () => new CLI().init(process.argv);

main().catch((err) => console.error(err));
