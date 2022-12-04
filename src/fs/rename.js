import { access, constants, rename as fsRename } from "node:fs/promises";
import { getDirAndFileName } from "../helpers/index.mjs";

const errorMessage = "FS operation failed";

const isFileExisting = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const rename = async (basePath, newPath) => {
  try {
    if (await isFileExisting(newPath)) {
      throw new Error(errorMessage);
    }

    await fsRename(basePath, newPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(errorMessage);
    }
    throw new Error(err);
  }
};
try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await rename(
    `${__dirname}/files/wrongFilename.txt`,
    `${__dirname}/files/properFilename.md`
  );
} catch (err) {
  console.error(err);
}
