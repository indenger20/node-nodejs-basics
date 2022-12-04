import { fork } from "node:child_process";
import { getDirAndFileName } from "../helpers/index.mjs";

const spawnChildProcess = async (args = []) => {
  const { __dirname } = getDirAndFileName(import.meta.url);

  const child = fork(`${__dirname}/files/script.js`, args, {
    stdio: "pipe",
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("error", (err) => {
    console.error("error");
  });
};

spawnChildProcess(["someArg1", "someArg2"]);
