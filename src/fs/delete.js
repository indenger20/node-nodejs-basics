import { rm } from "node:fs/promises";
import { getDirAndFileName } from "../helpers/index.mjs";

const remove = async (filePath) => {
  try {
    await rm(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await remove(`${__dirname}/files/fileToRemove.txt`);
} catch (err) {
  console.error(err);
}
