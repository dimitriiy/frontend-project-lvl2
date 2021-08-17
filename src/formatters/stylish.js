import _ from 'lodash';
import { STATUS } from '../consts.js';

const LEN_INDENT = 4;

const stringifyObject = (obj, offset = LEN_INDENT) => {
  const keys = _.keys(obj);
  const startIndent = ' '.repeat(offset);
  const endOffset = ' '.repeat(offset - LEN_INDENT);

  const formattingObjectAsString = keys.map((key) => {
    if (_.isObject(obj[key])) {
      return `${startIndent}${key}: ${stringifyObject(obj[key], offset + LEN_INDENT)}\n`;
    }
    return `${startIndent}${key}: ${obj[key]}\n`;
  }).join('');

  return `{\n${formattingObjectAsString}${endOffset}}`;
};

const stringifyRow = (value, offset = 0) => {
  if (_.isObject(value)) {
    return stringifyObject(value, offset);
  }

  return value;
};

const stylish = (treeData) => {
  const stylizeData = (astTree, offset = LEN_INDENT) => {
    const baseIntend = ' '.repeat(offset);
    const diffIntend = ' '.repeat(offset - 2);
    const closeIntend = ' '.repeat(offset - LEN_INDENT);

    const formattingBody = astTree.flatMap((node) => {
      if (node.status === STATUS.HAS_CHILDREN) {
        return `${baseIntend}${node.key}: ${stylizeData(node.value, offset + LEN_INDENT)}\n`;
      }

      if (node.status === STATUS.NOT_CHANGED) {
        return `${baseIntend}${node.key}: ${node.value}\n`;
      }

      if (node.status === STATUS.CHANGED) {
        return [`${diffIntend}- ${node.key}: ${stringifyRow(node.prevValue, offset + LEN_INDENT)}\n`,
          `${diffIntend}+ ${node.key}: ${stringifyRow(node.value, offset + LEN_INDENT)}\n`];
      }

      if (node.status === STATUS.ADDED) {
        return `${diffIntend}+ ${node.key}: ${stringifyRow(node.value, offset + LEN_INDENT)}\n`;
      }

      if (node.status === STATUS.REMOVED) {
        return `${diffIntend}- ${node.key}: ${stringifyRow(node.value, offset + LEN_INDENT)}\n`;
      }

      return [];
    }).join('');

    return `{\n${formattingBody}${closeIntend}}`;
  };

  return stylizeData(treeData);
};

export default stylish;
