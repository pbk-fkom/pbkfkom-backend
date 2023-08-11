const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  urlDb: process.env.MONGO_URL,
  storageUrl: process.env.AWS_STORAGE_URL,
  hostname: process.env.AWS_HOSTNAME,
  protocol: process.env.AWS_PROTOCOL,
  path: process.env.AWS_PATH,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.S3_BUCKET_NAME,
};
