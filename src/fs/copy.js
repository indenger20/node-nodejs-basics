import { cp } from "node:fs/promises";
import { getDirAndFileName } from '../helpers/index.mjs';

const copy = async (basePath, newPath) => {
  try {
    await cp(basePath, newPath, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  } catch (err) {
    if (err.code === "ERR_FS_CP_EEXIST" || err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await copy(`${__dirname}/files`, `${__dirname}/files_copy`);
} catch (err) {
  console.error(err);
}
