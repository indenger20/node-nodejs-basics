import { readFile } from "node:fs/promises";
import { getDirAndFileName } from "../helpers/index.mjs";

const read = async (fileName) => {
  try {
    const file = await readFile(fileName, {
      encoding: "utf-8",
    });
    console.log("file", file);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await read(`${__dirname}/files/fileToRead.txt`);
} catch (err) {
  console.error(err);
}
