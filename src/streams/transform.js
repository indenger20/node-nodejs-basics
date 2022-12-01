import { Transform } from "node:stream";

const transform = async () => {
  const revereString = new Transform({
    transform(chunk, encoding, callback) {
      this.push(String(chunk).split("").reverse().join('') + '\n');
      callback();
    },
  });

  process.stdin.pipe(revereString).pipe(process.stdout);
};

try {
  await transform();
} catch (err) {
  console.error(err);
}
