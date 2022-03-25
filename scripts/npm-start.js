'use strict';
const runAll = require('npm-run-all');

runAll(['dev', 'upload'], {
  parallel: true,
  stdout: process.stdout,
  stdin: process.stdin
}).catch(({results}) => {
  results
    .filter(({code}) => code)
    .forEach(({name}) => {
      console.log(`"npm run ${name}" failed`);
    })
  ;
});