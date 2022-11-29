import { rm } from "node:fs/promises";

const remove = async () => {
  try {
    await rm("./files/fileToRemove.txt");
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  await remove();
} catch (err) {
  console.log(err);
}
