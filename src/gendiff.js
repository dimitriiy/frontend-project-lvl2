import _ from 'lodash';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import { formatterFactory } from './formatters/index.js';
import { STATUS } from './consts.js';

const parser = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8');

  if (['.yml', '.yaml'].includes(path.extname(filePath))) {
    return yaml.load(file);
  }

  return JSON.parse(file);
};

const getASTDiff = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);
  const diffTree = [];

  sortedKeys.forEach((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      diffTree.push({
        key,
        status: STATUS.ADDED,
        value: obj2[key],
      });

      return;
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      diffTree.push({
        key,
        status: STATUS.REMOVED,
        value: obj1[key],
      });
      return;
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      diffTree.push({
        key,
        status: STATUS.COMPLEX,
        value: getASTDiff(obj1[key], obj2[key]),
      });
      return;
    }

    if (obj1[key] === obj2[key]) {
      diffTree.push({
        key,
        status: STATUS.NOT_CHANGED,
        value: obj1[key],
      });
    } else {
      diffTree.push({
        key,
        status: STATUS.CHANGED,
        oldValue: obj1[key],
        value: obj2[key],
      });
    }
  });

  return diffTree;
};

const gendiff = (path1, path2, optionalArguments) => {
  const format = optionalArguments.format || 'stylish';
  const [obj1, obj2] = [path1, path2].map(parser);
  const formatter = formatterFactory(format);
  const diffTree = getASTDiff(obj1, obj2);

  console.log(formatter(diffTree));
  return formatter(diffTree);
};

export default gendiff;
