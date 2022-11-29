import { readFile } from "node:fs/promises";
const read = async (fileName) => {
  try {
    const file = await readFile(fileName, {
      encoding: "utf-8",
    });
    console.log("file", file);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};

try {
  await read('./files/fileToRead.txt');
} catch (err) {
  console.log(err);
}
