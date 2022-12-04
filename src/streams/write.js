import { createWriteStream } from "node:fs";
import { getDirAndFileName } from "../helpers/index.mjs";

const write = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath, {
      encoding: "utf-8",
      flags: "w",
    });

    process.stdin.on("data", (data) => {
      stream.write(data);
    });

    process.stdin.on('end', () => {
      stream.close();
    })

    stream.on("finish", () => resolve("Success"));
    stream.on("error", (err) => reject(err));
  });
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await write(`${__dirname}/files/fileToWrite.txt`);
} catch (err) {
  console.error(err);
}
