const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  urlDb: process.env.MONGO_URL,
  storageUrl: process.env.AWS_STORAGE_URL,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucketName: process.env.S3_BUCKET_NAME,
};
