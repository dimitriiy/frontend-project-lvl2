import _ from 'lodash';
import { STATUS } from '../consts';

const LEN_INDENT = 4;

const printObject = (obj, offset = LEN_INDENT) => {
  const keys = _.keys(obj);
  const offsetString = ' '.repeat(offset);
  const endOffset = ' '.repeat(offset - LEN_INDENT);
  let result = '';

  keys.forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result += `${offsetString}${key}: ${printObject(obj[key], offset + LEN_INDENT)}\n`;
    } else {
      result += `${offsetString}${key}: ${obj[key]}\n`;
    }
  });

  return `{\n${result}${endOffset}}`;
};

const printRow = (value, offset = 0) => {
  if (_.isObject(value)) {
    return printObject(value, offset);
  }

  return value;
};

export const stylish = (tree, offset = LEN_INDENT) => {
  let stringifyObject = '';
  const baseIntend = ' '.repeat(offset);
  const diffIntend = ' '.repeat(offset - 2);
  const closeIntend = ' '.repeat(offset - LEN_INDENT);

  tree.forEach((item) => {
    if (item.status === STATUS.COMPLEX) {
      stringifyObject += `${baseIntend}${item.key}: ${stylish(item.value, offset + LEN_INDENT)}\n`;
    }

    if (item.status === STATUS.NOT_CHANGED) {
      stringifyObject += `${baseIntend}${item.key}: ${item.value}\n`;
    }

    if (item.status === STATUS.CHANGED) {
      stringifyObject += `${diffIntend}- ${item.key}: ${printRow(item.oldValue, offset + LEN_INDENT)}\n`;
      stringifyObject += `${diffIntend}+ ${item.key}: ${printRow(item.value, offset + LEN_INDENT)}\n`;
    }

    if (item.status === STATUS.ADDED) {
      stringifyObject += `${diffIntend}+ ${item.key}: ${printRow(item.value, offset + LEN_INDENT)}\n`;
    }

    if (item.status === STATUS.REMOVED) {
      stringifyObject += `${diffIntend}- ${item.key}: ${printRow(item.value, offset + LEN_INDENT)}\n`;
    }
  });

  return `{\n${stringifyObject}${closeIntend}}`;
};