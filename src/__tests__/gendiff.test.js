import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff', () => {
  it('json', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    expect(gendiff(file1, file2, { format: 'stylish' })).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });
  it('yml', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');

    expect(gendiff(file1, file2, { format: 'stylish' })).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });

  it('nested', () => {
    const file1 = getFixturePath('file1.nested.json');
    const file2 = getFixturePath('file2.nested.json');

    expect(gendiff(file1, file2, { format: 'stylish' })).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
  });

  it('plain formatter', () => {
    const file1 = getFixturePath('file1.nested.json');
    const file2 = getFixturePath('file2.nested.json');

    expect(gendiff(file1, file2, { format: 'plain' })).toEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
  });

  it('json formatter', () => {
    const file1 = getFixturePath('file1.nested.json');
    const file2 = getFixturePath('file2.nested.json');
    const result = '[{"key":"common","status":"COMPLEX","value":[{"key":"follow","status":"ADDED","value":false},{"key":"setting1","status":"NOT_CHANGE","value":"Value 1"},{"key":"setting2","status":"REMOVED","value":200},{"key":"setting3","status":"CHANGED","oldValue":true,"value":null},{"key":"setting4","status":"ADDED","value":"blah blah"},{"key":"setting5","status":"ADDED","value":{"key5":"value5"}},{"key":"setting6","status":"COMPLEX","value":[{"key":"doge","status":"COMPLEX","value":[{"key":"wow","status":"CHANGED","oldValue":"","value":"so much"}]},{"key":"key","status":"NOT_CHANGE","value":"value"},{"key":"ops","status":"ADDED","value":"vops"}]}]},{"key":"group1","status":"COMPLEX","value":[{"key":"baz","status":"CHANGED","oldValue":"bas","value":"bars"},{"key":"foo","status":"NOT_CHANGE","value":"bar"},{"key":"nest","status":"CHANGED","oldValue":{"key":"value"},"value":"str"}]},{"key":"group2","status":"REMOVED","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","status":"ADDED","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

    expect(gendiff(file1, file2, { format: 'json' })).toEqual(result);
  });
});
