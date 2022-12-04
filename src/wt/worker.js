import { Worker, isMainThread, parentPort } from "node:worker_threads";
import { getDirAndFileName } from "../helpers/index.mjs";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
  parentPort.on("message", (number) => {
    for (let i = 0; i < number; i += 1) {
      const result = nthFibonacci(i);
      parentPort.postMessage(result);
    }
    parentPort.close();
  });
};

if (isMainThread) {
  const { __filename } = getDirAndFileName(import.meta.url);
  const worker = new Worker(__filename);

  worker.on("message", (message) => {
    console.log("message", message);
  });

  worker.postMessage(5);
} else {
  sendResult();
}
