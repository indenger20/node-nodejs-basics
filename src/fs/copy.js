import { cp } from "node:fs/promises";

const copy = async () => {
  try {
    await cp("./files", "./files_copy", {
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
  await copy();
} catch (err) {
  console.log(err);
}
