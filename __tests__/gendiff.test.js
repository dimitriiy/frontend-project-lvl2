import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import gendiff from '../src/gendiff.js';
import JSONFormatterOutput from '../__fixtures__/resultForJSONFormatter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultForStylishFormatter = fs.readFileSync(getFixturePath('resultForStylishFormat.txt'), 'utf-8').trim();
const resultForPlainFormatter = fs.readFileSync(getFixturePath('resultForPlainFormat.txt'), 'utf-8').trim();
const resultForJSONFormatter = JSON.stringify(JSONFormatterOutput);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const ymlFile1 = getFixturePath('file1.yml');
const ymlFile2 = getFixturePath('file2.yml');

const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');

const cases = [
  [jsonFile1, jsonFile2, undefined, resultForStylishFormatter],
  [ymlFile1, ymlFile2, undefined, resultForStylishFormatter],
  [yamlFile1, yamlFile2, undefined, resultForStylishFormatter],

  [jsonFile1, jsonFile2, 'stylish', resultForStylishFormatter],
  [ymlFile1, ymlFile2, 'stylish', resultForStylishFormatter],
  [yamlFile1, yamlFile2, 'stylish', resultForStylishFormatter],

  [jsonFile1, jsonFile2, 'plain', resultForPlainFormatter],
  [ymlFile1, ymlFile2, 'plain', resultForPlainFormatter],
  [yamlFile1, yamlFile2, 'plain', resultForPlainFormatter],

  [jsonFile1, jsonFile2, 'json', resultForJSONFormatter],
  [ymlFile1, ymlFile2, 'json', resultForJSONFormatter],
  [yamlFile1, yamlFile2, 'json', resultForJSONFormatter],
];

describe('Testing gendiff', () => {
  test.each(cases)('diff %p and %p with %p format', (file1, file2, format, expectedResult) => {
    expect(gendiff(file1, file2, format)).toEqual(expectedResult);
  });
});
