import _ from 'lodash';
import { STATUS } from '../consts.js';

const LEN_INDENT = 4;

const stringify = (obj, offset = LEN_INDENT) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const startIndent = ' '.repeat(offset);
  const endOffset = ' '.repeat(offset - LEN_INDENT);
  const formattingObjectAsString = Object.entries(obj).map(([key, value]) => `${startIndent}${key}: ${stringify(value, offset + LEN_INDENT)}\n`).join('');

  return `{\n${formattingObjectAsString}${endOffset}}`;
};

const stylish = (treeData) => {
  const stylizeData = (astTree, offset = LEN_INDENT) => {
    const baseIntend = ' '.repeat(offset);
    const diffIntend = ' '.repeat(offset - 2);
    const closeIntend = ' '.repeat(offset - LEN_INDENT);

    const formattingBody = astTree.flatMap((node) => {
      if (node.status === STATUS.HAS_CHILDREN) {
        return `${baseIntend}${node.key}: ${stylizeData(node.value, offset + LEN_INDENT)}`;
      }

      if (node.status === STATUS.NOT_CHANGED) {
        return `${baseIntend}${node.key}: ${node.value}`;
      }

      if (node.status === STATUS.CHANGED) {
        return [`${diffIntend}- ${node.key}: ${stringify(node.prevValue, offset + LEN_INDENT)}`,
          `${diffIntend}+ ${node.key}: ${stringify(node.value, offset + LEN_INDENT)}`];
      }

      if (node.status === STATUS.ADDED) {
        return `${diffIntend}+ ${node.key}: ${stringify(node.value, offset + LEN_INDENT)}`;
      }

      if (node.status === STATUS.REMOVED) {
        return `${diffIntend}- ${node.key}: ${stringify(node.value, offset + LEN_INDENT)}`;
      }

      return [];
    });

    return [
      '{',
      ...formattingBody,
      `${closeIntend}}`,
    ].join('\n');
  };

  return stylizeData(treeData);
};

export default stylish;
