import { access, constants, rename as fsRename } from "node:fs/promises";

const errorMessage = "FS operation failed";

const isFileExisting = async (path) => {
  try {
    await access(path, constants.R_OK);
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
  await rename("./files/wrongFilename.txt", "./files/properFilename.md");
} catch (err) {
  console.log(err);
}
