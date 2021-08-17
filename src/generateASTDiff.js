import _ from 'lodash';
import { STATUS } from './consts';

const generateASTDiff = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  const diffTree = sortedKeys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        status: STATUS.ADDED,
        value: obj2[key],
      };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        status: STATUS.REMOVED,
        value: obj1[key],
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        status: STATUS.HAS_CHILDREN,
        value: generateASTDiff(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        key,
        status: STATUS.NOT_CHANGED,
        value: obj1[key],
      };
    }
    return {
      key,
      status: STATUS.CHANGED,
      prevValue: obj1[key],
      value: obj2[key],
    };
  });

  return diffTree;
};

export default generateASTDiff;
