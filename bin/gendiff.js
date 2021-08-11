#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format (default:"stylish")', 'stylish')
  .action(gendiff);

program.parse(process.argv);
