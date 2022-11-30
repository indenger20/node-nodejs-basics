import fileA from "./files/a.json" assert { type: 'json' };
import fileB from "./files/b.json" assert { type: 'json' };

export const getRandomFile = () => {
  const random = Math.random();
  return random > 0.5 ? fileA : fileB;
};
