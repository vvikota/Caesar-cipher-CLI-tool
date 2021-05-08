const textChangerScript = require('./textchanger');
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const chalk = require('chalk');

exports.streams = function (options) {
  const isOutput = Object.keys(options).indexOf('output') >= 0;
  const isInput = Object.keys(options).indexOf('input') >= 0;
  let streamWrite;
  let streamRead;

  isInput ?
    streamRead = new fs.ReadStream(options.input, 'utf8') :
    streamRead = process.stdin

  isOutput ?
    streamWrite = new fs.WriteStream(options.output, {flags: 'a'}) :
    streamWrite = process.stdout

  const transformStream = (offsetStep, action) => {
    return new Transform({
      transform(chunk, encoding, callback) {
        this.push(textChangerScript.textChanger(chunk, offsetStep, action));
        callback();
      }
    })
  }

  pipeline(
    streamRead,
    transformStream(options.shift, options.action),
    streamWrite,

    err => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log(chalk.red('no such file or directory'), chalk.green('!!!'))
        } else {
          console.log('Failed', err)
        }

      } 
      else {
        console.log('Success')
      }
    }
  )
}