import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import formatterFactory from './formatters/index.js';
import generateASTDiff from './generateASTDiff.js';

const parse = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');

  if (['.yml', '.yaml'].includes(path.extname(filePath))) {
    return yaml.load(file);
  }

  return JSON.parse(file);
};

const gendiff = (filePath1, filePath2, optionalArguments) => {
  const format = (typeof optionalArguments === 'object' ? optionalArguments.format : optionalArguments) || 'stylish';
  const [obj1, obj2] = [filePath1, filePath2].map(parse);
  const formatter = formatterFactory(format);
  const diffTree = generateASTDiff(obj1, obj2);

  // console.log(formatter(diffTree));
  return formatter(diffTree);
};

export default gendiff;
