Entity = require("./models/entity");
const subscriber = require("./mqtt/subscribe");

module.exports.loadEntities = () => {
  //load all entities in entities
  Entity.getEntity((err, msg) => {
    if (err) throw err;
    else {
      module.exports.entities = msg;
      console.log("Subscribing in all stored entities:");
      for (entity of msg) subscriber.entityWatcher(entity);
    }
  });
};
 