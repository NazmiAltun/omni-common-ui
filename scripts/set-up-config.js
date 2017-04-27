#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { gzip } = require('zlib');

const options = require('command-line-args')([
  { name: 'config', alias: 'c', type: String },
]);

const configsDir = path.resolve('dist-configs');
const distDir = path.resolve('dist');
const distGzDir = path.resolve('dist-gz');

const confData = fs.readFileSync(path.join(configsDir, `${options.config}.js`), 'utf8');

const indexFile = path.join(distDir, 'index.html');
const indexGzFile = path.join(distGzDir, 'index.html');
const indexData = fs.readFileSync(indexFile, 'utf8');

const patchedIndexData = indexData.replace(' src="config.js">', `>${confData}`);

gzip(patchedIndexData, (_, buf) => {
  fs.writeFile(indexGzFile, buf);
});
fs.writeFile(indexFile, patchedIndexData, 'utf8');
