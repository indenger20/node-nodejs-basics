import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";

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
  await create("./files/fresh.txt", "I am fresh and young");
} catch (err) {
  console.log(err);
}
