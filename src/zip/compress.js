import { createGzip } from "node:zlib";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { getDirAndFileName } from "../helpers/index.mjs";


const compress = async (input, output) => {
  const pipe = promisify(pipeline);
  const gzip = createGzip();
  const inputStream = createReadStream(input);
  const outputStream = createWriteStream(output);
  await pipe(inputStream, gzip, outputStream);
};

try {
  const { __dirname } = getDirAndFileName(import.meta.url);
  await compress(
    `${__dirname}/files/fileToCompress.txt`,
    `${__dirname}/files/archive.gz`
  );
} catch (err) {
  console.log(err);
}
