import _ from 'lodash';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const STATUS = {
  CHANGED: 'CHANGED',
  NOT_CHANGED: 'NOT_CHANGE',
  ADDED: 'ADDED',
  REMOVED: 'REMOVED',
  HAS_CHILDREN: 'HAS_CHILDREN',
};

const LEN_INTEND = 4;

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
        status: STATUS.HAS_CHILDREN,
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

const printObject = (obj, offset = LEN_INTEND) => {
  const keys = _.keys(obj);
  const offsetString = ' '.repeat(offset);
  const endOffset = ' '.repeat(offset - LEN_INTEND);
  let result = '';

  keys.forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result += `${offsetString}${key}: ${printObject(obj[key], offset + LEN_INTEND)}\n`;
    } else {
      result += `${offsetString}${key}: ${obj[key]}\n`;
    }
  });

  return `{\n${result}${endOffset}}`;
};

const printRow = (value, offset = 0) => {
  if (typeof value === 'object' && value !== null) {
    return printObject(value, offset);
  }

  return value;
};
const stylish = (tree, offset = LEN_INTEND) => {
  let stringifyObject = '';
  const baseIntend = ' '.repeat(offset);
  const diffIntend = ' '.repeat(offset - 2);
  const closeIntend = ' '.repeat(offset - LEN_INTEND);

  tree.forEach((item) => {
    if (item.status === STATUS.HAS_CHILDREN) {
      stringifyObject += `${baseIntend}${item.key}: ${stylish(item.value, offset + LEN_INTEND)}\n`;
    }

    if (item.status === STATUS.NOT_CHANGED) {
      stringifyObject += `${baseIntend}${item.key}: ${item.value}\n`;
    }

    if (item.status === STATUS.CHANGED) {
      stringifyObject += `${diffIntend}- ${item.key}: ${printRow(item.oldValue, offset + LEN_INTEND)}\n`;
      stringifyObject += `${diffIntend}+ ${item.key}: ${printRow(item.value, offset + LEN_INTEND)}\n`;
    }

    if (item.status === STATUS.ADDED) {
      stringifyObject += `${diffIntend}+ ${item.key}: ${printRow(item.value, offset + LEN_INTEND)}\n`;
    }

    if (item.status === STATUS.REMOVED) {
      stringifyObject += `${diffIntend}- ${item.key}: ${printRow(item.value, offset + LEN_INTEND)}\n`;
    }
  });

  return `{\n${stringifyObject}${closeIntend}}`;
};

const gendiff = (path1, path2) => {
  const [obj1, obj2] = [path1, path2].map(parser);

  const diffTree = getASTDiff(obj1, obj2);

  return stylish(diffTree);
};

export default gendiff;
