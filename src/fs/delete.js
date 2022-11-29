import { rm } from "node:fs/promises";

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
  await remove("./files/fileToRemove.txt");
} catch (err) {
  console.log(err);
}
