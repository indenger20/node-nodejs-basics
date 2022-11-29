import { readdir } from "node:fs/promises";

const list = async (path) => {
  try {
    const files = await readdir(path);
    console.log('files', files);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  await list('./files');
} catch (err) {
  console.log(err);
}
