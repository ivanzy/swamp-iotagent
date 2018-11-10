const nconf = require("nconf");
const async = require("async");
const axios = require("axios");
const param = require("./param");

//Load Environment variables from .env file
require("dotenv").load();
nconf.use("memory");
nconf.env().argv();

//Load application modules
const server = require("./config/initializers/server");
const db = require("./config/initializers/database");
const subscribe = require("./mqtt/subscribe");

//initializing db
async.series([callback => db(callback), param.loadEntities], function(err) {
  if (err) console.log("Initialization failed" + err);
  else console.log("Initialized SUCCESSFULLY");
});

//initializing modules
async.parallel(
  [
    //initalizing server
    callback => server(callback)
  ],
  function(err) {
    if (err) console.log("SWAMP IoT Agent initialization failed" + err);
    else console.log("SWAMP IoT Agent initialized SUCCESSFULLY");
  }
);
