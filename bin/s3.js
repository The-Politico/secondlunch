const fs = require('fs');
const s3 = require('s3');
const open = require('open');
const path = require('path');
const chalk = require('chalk');

const awsSettings = JSON.parse(fs.readFileSync('./package.json')).aws;

const client = s3.createClient();

const params = {
  localDir: "./dist",
  deleteRemoved: true,
  s3Params: {
    Bucket: awsSettings.bucket,
    Prefix: awsSettings.prefix,
    ACL: "public-read",
    CacheControl: awsSettings.cacheControl,
  },
};

console.log(chalk.bold("Done building your package.\nStarting upload."));
const uploader = client.uploadDir(params);

uploader.on('error', function(err) {
  console.error(chalk.red.bold("🚨 Unable to sync: "), err.stack);
});
uploader.on('fileUploadStart', function(local, remote) {
  console.log(
    chalk.bold("Uploading ") +
    chalk.cyan.bold(local) +
    chalk.bold(" to ") +
    chalk.green.bold(remote)
  );
});
uploader.on('end', function() {
  console.log(chalk.bold("Done uploading. 🏁"));
});
