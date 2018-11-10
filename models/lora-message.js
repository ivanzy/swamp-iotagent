const mongoose = require("mongoose");

const loraMessageSchema = mongoose.Schema({
  applicationID: {
    type: String
  },
  applicationName: {
    type: String
  },
  deviceName: {
    type: String
  },
  devEUI: {
    type: String
  },
  txInfo: {
    type: Object
  },
  adr: {
    type: Boolean
  },
  fCnt: {
    type: Number
  },
  fport: {
    type: Number
  },
  data: {
    type: String
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const loraMessage = (module.exports = mongoose.model(
  "loraMessage",
  loraMessageSchema
));

//Get rawMessages
module.exports.getLoraMessage = (callback, limit) => {
  console.log("getting all the LoraMessages");
  loraMessage.find(callback).limit(limit);
};

//Get rawMessages by id
module.exports.getLoraMessageById = (_id, callback) => {
  console.log("get raw message by id:" + _id);
  loraMessage.findById(_id, callback);
};

//post new rawMessage
module.exports.addLoraMessage = (msg, callback) => {
  console.log(" adding new LoRa Message:" + JSON.stringify(msg));
  loraMessage.create(msg, callback);
};

// Delete rawMessage
module.exports.removeLora

Message = (_id, callback) => {
  let query = { _id: _id };
  loraMessage.remove(query, callback);
};
