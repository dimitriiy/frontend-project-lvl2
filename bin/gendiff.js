#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

function gendiffConsole(filePath1, filePath2, { format }) {
  console.log(gendiff(filePath1, filePath2, format));
}

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format (default:"stylish")', 'stylish')
  .action(gendiffConsole);

program.parse(process.argv);
