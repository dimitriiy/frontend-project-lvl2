import { toPlain } from './toPlain.js';
import { stylish } from './stylish.js';
import { toJSon } from './json.js';

const formatterMap = {
  stylish, plain: toPlain, json: toJSon,
};

export const formatterFactory = (name) => {
  console.log({name})
  if (!formatterMap[name]) {
    throw new Error(`${name} formatter doesn't exist.`);
  }

  return formatterMap[name];
};
