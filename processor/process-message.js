const publisher = require("../publisher/publisher");

module.exports.processMessage = (entity, message) => {
  decoded_data = decode64toAscii(message.data);
  ngsi_message = struture_attributes(decoded_data, entity);
  publisher.updateEntity(ngsi_message, entity.orion_address);
};

module.exports.createMessage = entity => {
  ngsi_message = strutureCreateEntity(entity);
  publisher.createEntity(ngsi_message, entity.orion_address);
};

decode64toAscii = data => new Buffer(data, "base64").toString("ascii");
struture_attributes = (attr, entity) => {
  let attributes_structured = {};
  let split_data = attr.split("|");
  for (let i = 0; i <= split_data.length; i++) {
    if (i % 2 == 0) {
      for (attribute of entity.attributes) {
        if (attribute.object_id == split_data[i]) {
          let temp = { value: split_data[++i], type: attribute.type };
          attributes_structured[attribute.name] = temp;
        }
      }
    }
  }
  return attributes_structured;
};

strutureCreateEntity = entity => {
  let attributes_structured = {};
  attributes_structured.id = entity.entity_name;
  attributes_structured.type = entity.entity_type;
  attributes_structured.timezone = entity.timezone;
  for (attribute of entity.attributes) {
    let temp = { value: {}, type: attribute.type };
    attributes_structured[attribute.name] = temp;
  }
  return attributes_structured;
};
