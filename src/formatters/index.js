import { plain } from './plain.js';
import { stylish } from './stylish.js';

const formatterMap = {
  stylish, plain,
};

export const formatterFactory = (name) => {
  if (!formatterMap[name]) {
    throw new Error(`${name} formatter doesn't exist.`);
  }

  return formatterMap[name];
};
