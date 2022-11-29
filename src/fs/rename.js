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

const rename = async () => {
  const folderPath = "./files";
  const newFileName = "properFilename.md";

  try {
    if (await isFileExisting(`${folderPath}/${newFileName}`)) {
      throw new Error(errorMessage);
    }

    await fsRename(
      `${folderPath}/wrongFilename.txt`,
      `${folderPath}/${newFileName}`
    );
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(errorMessage);
    }
    throw new Error(err);
  }
};
try {
  await rename();
} catch (err) {
  console.log(err);
}
