export default [{
  key: 'common',
  status: 'HAS_CHILDREN',
  value: [{ key: 'follow', status: 'ADDED', value: false }, { key: 'setting1', status: 'NOT_CHANGE', value: 'Value 1' }, { key: 'setting2', status: 'REMOVED', value: 200 }, {
    key: 'setting3', status: 'CHANGED', prevValue: true, value: null,
  }, { key: 'setting4', status: 'ADDED', value: 'blah blah' }, { key: 'setting5', status: 'ADDED', value: { key5: 'value5' } }, {
    key: 'setting6',
    status: 'HAS_CHILDREN',
    value: [{
      key: 'doge',
      status: 'HAS_CHILDREN',
      value: [{
        key: 'wow', status: 'CHANGED', prevValue: '', value: 'so much',
      }],
    }, { key: 'key', status: 'NOT_CHANGE', value: 'value' }, { key: 'ops', status: 'ADDED', value: 'vops' }],
  }],
}, {
  key: 'group1',
  status: 'HAS_CHILDREN',
  value: [{
    key: 'baz', status: 'CHANGED', prevValue: 'bas', value: 'bars',
  }, { key: 'foo', status: 'NOT_CHANGE', value: 'bar' }, {
    key: 'nest', status: 'CHANGED', prevValue: { key: 'value' }, value: 'str',
  }],
}, { key: 'group2', status: 'REMOVED', value: { abc: 12345, deep: { id: 45 } } }, { key: 'group3', status: 'ADDED', value: { deep: { id: { number: 45 } }, fee: 100500 } }];
