import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import formatterFactory from './formatters/index.js';
import generateASTDiff from './generateASTDiff.js';

const parserMap = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const parse = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const fileExtension = path.extname(filePath).substr(1);

  if (!parserMap[fileExtension]) {
    throw new Error(`Parser for ${fileExtension} doesn't exist.`);
  }

  return parserMap[fileExtension](file);
};

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const [obj1, obj2] = [filePath1, filePath2].map(parse);
  const diffTree = generateASTDiff(obj1, obj2);

  return formatterFactory(diffTree, format);
};

export default gendiff;
