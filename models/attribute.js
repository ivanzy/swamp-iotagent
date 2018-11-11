const mongoose = require("mongoose");

// Atrribute from entity data model

const attributeSchema = mongoose.Schema({
  entity_name: {
     type:String,
     require:true
  },
  object_id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  }
});

const attribute = (module.exports = mongoose.model(
  "attribute",
  attributeSchema
));

//Get attribute
module.exports.getAttribute = (callback, limit) => {
  console.log("getting all the attribute");
  attribute.find(callback).limit(limit);
};

//Get attribute by id
module.exports.getAttributeById = (_id, callback) => {
  console.log("get attribute message by id:" + _id);
  attribute.findById(_id, callback);
};

//Get attribute by entity
module.exports.getAttributeById = (entity_name, callback) => {
   console.log("get attribute message by Entity:" + _id); 
   attribute.find({ entity_name: entity_name}, callback); 
};

//post new attribute
module.exports.addAttribute = (attr, callback) => {
  console.log("adding new attribute:" + JSON.stringify(attr));
  attribute.create(attr, callback);
};

// Delete attribute
module.exports.removeAttribute = (_id, callback) => {
  let query = { _id: _id };
  attribute.remove(query, callback);
};
