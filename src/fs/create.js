import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

const create = async () => {
    try {
      const text = new Uint8Array(Buffer.from('I am fresh and young'));
      await writeFile(`./files/fresh.txt`, text, { flag: "wx" });
    } catch (err) {
      if (err.code === 'EEXIST') {
        throw new Error('FS operation failed');
      }
      throw new Error(err);
    }
};
try {
  await create();
} catch (err) {
  console.log(err);
}