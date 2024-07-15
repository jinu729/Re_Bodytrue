const db = {
    //디비연결
    database: "bodytrue",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "diamond84*",
    timezone: "GMT",
    charset: "utf8mb4",
  };
  const dbPool = require("mysql").createPool(db);

  module.exports = dbPool;


