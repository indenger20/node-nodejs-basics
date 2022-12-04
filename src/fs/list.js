import { readdir } from "node:fs/promises";
import { getDirAndFileName } from "../helpers/index.mjs";

const list = async (path) => {
  try {
    const files = await readdir(path);
    console.log("files", files);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await list(`${__dirname}/files`);
} catch (err) {
  console.error(err);
}
