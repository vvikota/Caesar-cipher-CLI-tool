const chalk = require('chalk');
const streamsScript = require('./streams');
const { Command } = require('commander');

const program = new Command();
program.version('0.0.1');

program
  .option('-s, --shift <value>', 'shift mode')
  .option('-i, --input <path>', 'input path')
  .option('-o, --output <path>', 'output path')
  .option('-a, --action <mode>', 'action mode')

program.parse(process.argv);
const options = program.opts();  

const isAction = Object.keys(options).indexOf('action') >= 0;
const isShift = Object.keys(options).indexOf('shift') >= 0;

if(isAction && isShift){
  streamsScript.streams(options);
} else {
  process.stderr.write(chalk.red('Action (encode/decode) and the shift are required!!!'));
  process.exit('1')
}

