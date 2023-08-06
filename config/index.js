const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  urlDb: process.env.MONGO_URL,
  storageUrl: process.env.B2_STORAGE_URL,
  applicationKeyId: process.env.B2_STORAGE_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_STORAGE_APPLICATION_KEY,
  bucketId: process.env.B2_STORAGE_BUCKET_ID,
};
