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
});
