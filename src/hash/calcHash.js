import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { getDirAndFileName } from "../helpers/index.mjs";

const calculateHash = async (path) => {
  const fileBuffer = await readFile(path);
  const hash = createHash("sha256").update(fileBuffer).digest("hex");
  console.log(hash);
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await calculateHash(`${__dirname}/files/fileToCalculateHashFor.txt`);
} catch (err) {
  console.error(err);
}
