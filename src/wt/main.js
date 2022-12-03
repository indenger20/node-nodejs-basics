import { Worker, isMainThread, parentPort } from "node:worker_threads";
import { cpus } from "node:os";
import { getDirAndFileName } from "../helpers/index.mjs";

const getWorkerPromises = (cpus) => {
  const { __dirname } = getDirAndFileName(import.meta.url);
  const workerPromises = [...Array(cpus).keys()].map((cpu) => {
    return new Promise((resolve) => {
      const worker = new Worker(`${__dirname}/worker.js`);
      const result = [];
      worker.on("message", (message) => {
        result.push(message);
      });
      worker.on("error", (err) => {
        console.error(err);
        resolve({
          status: "error",
          data: null,
        });
      });
      worker.on("exit", () => {
        resolve({
          status: "resolved",
          data: result,
        });
      });
      worker.postMessage(10 + cpu);
    });
  });
  return workerPromises;
};

const performCalculations = async () => {
  const numOfCpus = cpus().length;
  const workerPromises = getWorkerPromises(numOfCpus);
  const result = await Promise.all(workerPromises);
  console.log(result);
};

try {
  await performCalculations();
} catch (err) {
  console.error(err);
}
