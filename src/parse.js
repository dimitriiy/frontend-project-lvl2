import yaml from 'js-yaml';

const parserMap = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const parse = (data, format) => {
  if (!parserMap[format]) {
    throw new Error(`Parser for ${format} doesn't exist.`);
  }

  return parserMap[format](data);
};

export default parse;
