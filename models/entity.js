const mongoose = require("mongoose");

const entitySchema = mongoose.Schema({
  device_id: {
    type: String,
    required: true
  },
  entity_name: {
    type: String,
    required: true
  },
  entity_type: {
    type: String,
    required: true
  },
  timezone: {
    type: String
  },
  application_id: {
   type: String,
   required: true
 },
 attributes:{
    type: Object,
    required: true
 },
 dev_eui: {
   type: String,
   required: true
 },
 broker_address:{
    type: String,
    required: true
 }
});

const entity = (module.exports = mongoose.model(
  "entity",
  entitySchema
));

//Get all entities
module.exports.getEntity = (callback, limit) => {
  console.log("getting all the entities");
  entity.find(callback).limit(limit);
};

//Get Entity by id
module.exports.getEntityById = (_id, callback) => {
  console.log("get Entity by id:" + _id);
  Entity.findById(_id, callback);
};

//post new Entity
module.exports.addEntity = (msg, callback) => {
  console.log("adding new Entity:" + JSON.stringify(msg));
  Entity.create(msg, callback);
};

// Delete Entity
module.exports.removeentity = (_id, callback) => {
   console.log("removing Entity...");
    let query = {_id: _id};
    Entity.remove(query, callback);
 }