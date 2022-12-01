import { createReadStream } from "node:fs";
import { getDirAndFileName } from "../helpers/index.mjs";

const read = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: "utf-8" });
    stream.on("data", (data) => {
      process.stdout.write(data);
    });

    stream.on("end", () => resolve("Success"));
    stream.on("error", () => reject(new Error("FS operation failed")));
  });
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await read(`${__dirname}/files/fileToRead.txt`);
} catch (err) {
  console.error(err);
}
