import { readdir } from "node:fs/promises";

const list = async () => {
  try {
    const files = await readdir('./files');
    console.log('files', files);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  await list();
} catch (err) {
  console.log(err);
}
