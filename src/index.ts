import "es6-shim";
import "reflect-metadata";

import { showTable, showSearch, showDescribe } from "./actions";
const program = require("commander");

program.version("0.0.1").description("Search command line");

program
  .command("--help")
  .alias("-h")
  .description("show command list")
  .action(() => {
    console.log("Show command");
  });

program
  .command("table <name> <key> <value>")
  .alias("tb")
  .description("show table search results")
  .action((name: string, key: string, value: string) => {
    showTable(name, key, value);
  });
program
  .command("search <name> <key> <value>")
  .alias("s")
  .description("show detail search results")
  .action((name: string, key: string, value: string) => {
    showSearch(name, key, value);
  });
program
  .command("describe <name>")
  .alias("ds")
  .description("describe key of search results")
  .action((name: string, key: string = "", value: string = "") => {
    showDescribe(name, key, value);
  });

program.parse(process.argv);
