import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import { getDirAndFileName } from "../helpers/index.mjs";
import { getRandomFile } from "./getRandomJson.mjs";
import "./files/c.js";

const { __dirname, __filename } = getDirAndFileName(import.meta.url);

const PORT = 3000;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

const unknownObject = getRandomFile();
console.log(unknownObject);

export { unknownObject, myServer };
