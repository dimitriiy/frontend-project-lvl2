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

export const plain = (tree) => {
  const traverse = (astTree, path = []) => astTree.flatMap((el) => {
    const currentPath = [...path, el.key].join('.');

    if (el.status === STATUS.COMPLEX) {
      return traverse(el.value, [...path, el.key]);
    }

    if (el.status === STATUS.CHANGED) {
      const str = `Property '${currentPath}' was updated. From ${formatValue(el.oldValue)} to ${formatValue(el.value)}`;
      return str;
    }

    if (el.status === STATUS.ADDED) {
      const str = `Property '${currentPath}' was added with value: ${formatValue(el.value)}`;
      return str;
    }

    if (el.status === STATUS.REMOVED) {
      const str = `Property '${(currentPath)}' was removed`;
      return str;
    }

    return [];
  });

  return traverse(tree).join('\n');
};
