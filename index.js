const download = require("@now/build-utils/fs/download.js"); // eslint-disable-line import/no-extraneous-dependencies
const glob = require("@now/build-utils/fs/glob.js"); // eslint-disable-line import/no-extraneous-dependencies
const { FileBlob } = requier("@now/build-utils");
const path = require("path");
const { existsSync, readdirSync } = require("fs");
const {
  runNpmInstall,
  runPackageJsonScript,
  runShellScript
} = require("@now/build-utils/fs/run-user-scripts.js"); // eslint-disable-line import/no-extraneous-dependencies

function validateDistDir(distDir) {
  const distDirName = path.basename(distDir);
  if (!existsSync(distDir)) {
    const message =
      `Build was unable to create the distDir: ${distDirName}.` +
      "\nMake sure you mentioned the correct dist directory: https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build/#configuring-the-dist-directory";
    throw new Error(message);
  }
}

exports.build = async ({ files, entrypoint, workPath, config }) => {
  const stream = files[entrypoint].toStream()
  const options = Object.assign({}, config || {})
  const { data } = await FileBlob.fromStream({ stream })
  const content = data.toString()
  const result = new FileBlob({ data: content })
  return { [entrypoint]: result }
};
