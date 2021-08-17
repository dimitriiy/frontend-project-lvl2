import _ from 'lodash';
import { STATUS } from '../consts.js';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const toPlain = (tree) => {
  const traverse = (astTree, path = []) => astTree.flatMap((node) => {
    const currentPath = [...path, node.key].join('.');

    if (node.status === STATUS.HAS_CHILDREN) {
      return traverse(node.value, [...path, node.key]);
    }

    if (node.status === STATUS.CHANGED) {
      return `Property '${currentPath}' was updated. From ${formatValue(node.prevValue)} to ${formatValue(node.value)}`;
    }

    if (node.status === STATUS.ADDED) {
      return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
    }

    if (node.status === STATUS.REMOVED) {
      return `Property '${(currentPath)}' was removed`;
    }

    return [];
  });

  return traverse(tree).join('\n');
};

export default toPlain;
