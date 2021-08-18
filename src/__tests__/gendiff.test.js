import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import gendiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Testing gendiff', () => {
  it('diff json files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result1 = fs.readFileSync(getFixturePath('resultForStylishFormat.txt'), 'utf-8').trim();

    expect(gendiff(file1, file2)).toEqual(result1);
  });

  it('diff yml files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const result1 = fs.readFileSync(getFixturePath('resultForStylishFormat.txt'), 'utf-8').trim();

    expect(gendiff(file1, file2)).toEqual(result1);
  });

  it('diff yaml files', () => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');
    const result1 = fs.readFileSync(getFixturePath('resultForStylishFormat.txt'), 'utf-8').trim();

    expect(gendiff(file1, file2)).toEqual(result1);
  });

  it('diff json files with plain formatter', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result = fs.readFileSync(getFixturePath('resultForPlainFormat.txt'), 'utf-8').trim();

    expect(gendiff(file1, file2, 'plain')).toEqual(result);
  });

  it('diff json files with json formatter', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result = '[{"key":"common","status":"HAS_CHILDREN","value":[{"key":"follow","status":"ADDED","value":false},{"key":"setting1","status":"NOT_CHANGE","value":"Value 1"},{"key":"setting2","status":"REMOVED","value":200},{"key":"setting3","status":"CHANGED","prevValue":true,"value":null},{"key":"setting4","status":"ADDED","value":"blah blah"},{"key":"setting5","status":"ADDED","value":{"key5":"value5"}},{"key":"setting6","status":"HAS_CHILDREN","value":[{"key":"doge","status":"HAS_CHILDREN","value":[{"key":"wow","status":"CHANGED","prevValue":"","value":"so much"}]},{"key":"key","status":"NOT_CHANGE","value":"value"},{"key":"ops","status":"ADDED","value":"vops"}]}]},{"key":"group1","status":"HAS_CHILDREN","value":[{"key":"baz","status":"CHANGED","prevValue":"bas","value":"bars"},{"key":"foo","status":"NOT_CHANGE","value":"bar"},{"key":"nest","status":"CHANGED","prevValue":{"key":"value"},"value":"str"}]},{"key":"group2","status":"REMOVED","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","status":"ADDED","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

    expect(gendiff(file1, file2, 'json')).toEqual(result);
  });
});
