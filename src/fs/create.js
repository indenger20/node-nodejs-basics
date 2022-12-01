import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import { getDirAndFileName } from '../helpers/index.mjs';

const create = async (filePath, content) => {
  try {
    const text = new Uint8Array(Buffer.from(content));
    await writeFile(filePath, text, { flag: "wx" });
  } catch (err) {
    if (err.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
    throw new Error(err);
  }
};
try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await create(`${__dirname}/files/fresh.txt`, "I am fresh and young");
} catch (err) {
  console.error(err);
}
