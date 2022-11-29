import { cp } from "node:fs/promises";

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
  await copy('./files', './files_copy');
} catch (err) {
  console.log(err);
}
