import path from 'path';
import fs from 'fs';
import formatterFactory from './formatters/index.js';
import generateASTDiff from './generateASTDiff.js';
import parse from './parse.js';

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const [file1, file2] = [filePath1, filePath2].map((filePath) => fs.readFileSync(filePath, 'utf8'));
  const [fileExtensionFile1, fileExtensionFile2] = [filePath1, filePath2]
    .map((filePath) => path.extname(filePath).substr(1));

  const obj1 = parse(file1, fileExtensionFile1);
  const obj2 = parse(file2, fileExtensionFile2);

  const diffTree = generateASTDiff(obj1, obj2);

  return formatterFactory(diffTree, format);
};

export default gendiff;
