const ENVIRONMENT = process.env.NODE_ENV;

const connectToDb = () => {
  if (ENVIRONMENT === "development") require("./mongo-Db/connectLocaly");
  if (ENVIRONMENT === "production") require("./mongo-Db/connectAtlas");
};

module.exports = connectToDb;
