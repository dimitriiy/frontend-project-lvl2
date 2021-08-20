import toPlain from './toPlain.js';
import stylish from './stylish.js';

const formatterMap = {
  stylish, plain: toPlain, json: JSON.stringify,
};

const formatterFactory = (astTree, name) => {
  if (!formatterMap[name]) {
    throw new Error(`${name} formatter doesn't exist.`);
  }

  return formatterMap[name](astTree);
};

export default formatterFactory;
