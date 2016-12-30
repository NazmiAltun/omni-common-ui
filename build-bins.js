#!/usr/bin/env node
/* eslint strict: "off" */

'use strict';

const path = require('path');
const fs = require('fs');
const { Map } = require('immutable');
const { config } = require('./package.json');
const log = require('loglevel');

log.enableAll();

const binDir = path.resolve('node_modules/.bin');

new Map(config.bin).forEach((dir, command) => {
  const link = path.join(binDir, command);
  const pointsTo = path.resolve(dir);
  fs.unlink(link, () => {
    fs.symlink(pointsTo, link, 'file', (error) => {
      if (error) {
        throw error;
      }

      log.info(`'${path.relative(process.cwd(), link)}' -> ${path.relative(process.cwd(), pointsTo)}`);
      fs.chmod(link, 511);
    });
  });
});
