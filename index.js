const download = require("@now/build-utils/fs/download.js"); // eslint-disable-line import/no-extraneous-dependencies
const glob = require("@now/build-utils/fs/glob.js"); // eslint-disable-line import/no-extraneous-dependencies
const path = require("path");

exports.build = async ({ files, entrypoint, workPath, config }) => {
  await download(files, workPath);
  const mountpoint = path.dirname(entrypoint);
  const distPath = path.join(
    workPath,
    path.dirname(entrypoint),
    (config && config.distDir) || '',
  );

  glob('**', distPath, mountpoint)
};
