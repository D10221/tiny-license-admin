import minimist from "minimist";
const argv = minimist(process.argv.slice(2));

import validateRemote from "./validate-remote";

const { validate, ...args } = argv;

function run() {
  if (validate)
    return validateRemote(args).then(x => {
      console.log("Result: %s", x);
    });
  return Promise.reject(new Error("Not Implemented"));
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});
