import _ from 'lodash';
import { STATUS } from '../consts.js';

const LEN_INDENT = 4;

const printObject = (obj, offset = LEN_INDENT) => {
  const keys = _.keys(obj);
  const offsetString = ' '.repeat(offset);
  const endOffset = ' '.repeat(offset - LEN_INDENT);

  const strs = keys.map((key) => {
    if (_.isObject(obj[key])) {
      return `${offsetString}${key}: ${printObject(obj[key], offset + LEN_INDENT)}\n`;
    }
    return `${offsetString}${key}: ${obj[key]}\n`;
  }).join('');

  return `{\n${strs}${endOffset}}`;
};

const printRow = (value, offset = 0) => {
  if (_.isObject(value)) {
    return printObject(value, offset);
  }

  return value;
};

const stylish = (tree, offset = LEN_INDENT) => {
  const baseIntend = ' '.repeat(offset);
  const diffIntend = ' '.repeat(offset - 2);
  const closeIntend = ' '.repeat(offset - LEN_INDENT);

  const rows = tree.flatMap((item) => {
    if (item.status === STATUS.COMPLEX) {
      return `${baseIntend}${item.key}: ${stylish(item.value, offset + LEN_INDENT)}\n`;
    }

    if (item.status === STATUS.NOT_CHANGED) {
      return `${baseIntend}${item.key}: ${item.value}\n`;
    }

    if (item.status === STATUS.CHANGED) {
      return [`${diffIntend}- ${item.key}: ${printRow(item.oldValue, offset + LEN_INDENT)}\n`, `${diffIntend}+ ${item.key}: ${printRow(item.value, offset + LEN_INDENT)}\n`];
    }

    if (item.status === STATUS.ADDED) {
      return `${diffIntend}+ ${item.key}: ${printRow(item.value, offset + LEN_INDENT)}\n`;
    }

    if (item.status === STATUS.REMOVED) {
      return `${diffIntend}- ${item.key}: ${printRow(item.value, offset + LEN_INDENT)}\n`;
    }

    return [];
  }).join('');

  return `{\n${rows}${closeIntend}}`;
};

export default stylish;
