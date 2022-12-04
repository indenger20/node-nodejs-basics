import { createUnzip } from "node:zlib";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { getDirAndFileName } from "../helpers/index.mjs";

const decompress = async (input, output) => {
  const pipe = promisify(pipeline);
  const unzip = createUnzip();
  const inputStream = createReadStream(input);
  const outputStream = createWriteStream(output);
  await pipe(inputStream, unzip, outputStream);
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await decompress(
    `${__dirname}/files/archive.gz`,
    `${__dirname}/files/decompress.txt`
  );
} catch (err) {
  console.log(err);
}
