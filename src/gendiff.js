import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const gendiff = (path1, path2) => {
  const [obj1, obj2] = [path1, path2]
    .map((pathFile) => readFileSync(path.resolve(process.cwd(), pathFile)))
    .map(JSON.parse);
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);
  let result = '';

  sortedKeys.forEach((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result += `   ${key}: ${obj1[key]}\n`;
      } else {
        result += ` - ${key}: ${obj1[key]}\n`;
        result += ` + ${key}: ${obj2[key]}\n`;
      }
      return;
    }

    if (!_.has(obj1, key) && _.has(obj1, key)) {
      result += ` - ${key}: ${obj1[key]}\n`;
    } else {
      result += ` + ${key}: ${obj2[key]}\n`;
    }
  });

  console.log(`{\n${result}}`);
};

export default gendiff;
