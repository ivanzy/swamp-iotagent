const mqtt = require("mqtt");
const config = require("nconf");
const processor = require("../processor/process-message");
const LoraMessage = require('../models/lora-message');


// Subscribing to a MQTT topic in which LoRa App server publishes messages for an Entity
module.exports.entityWatcher = (entity) => {
  let topic =   (`application/${entity.application_id}/device/${entity.dev_eui}/rx`);

  console.log(`Subscribing to ${topic} in address ${entity.broker_address}`);
  //connecting to broker
  const client = mqtt.connect(`mqtt://${entity.broker_address}`);
  //subscribing to configure topics
  client.subscribe(topic);

  monitoreMessage(client, entity);
  
};

var monitoreMessage = (client, entity) =>{
  //message event
  client.on("message", (topic, message) => {
    
    console.log(
      `MQTT message topic: ${topic} payload:${message.toString()} time:${new Date()}`
    ); 
    message = JSON.parse(message.toString());
    
 
    //add to LoRa message collection
    LoraMessage.addLoraMessage(message, (err, msg) => {
      if (err) throw err;
    });

    //process a new message (translate to NGSI)
    processedMessage = processor.processMessage(entity,message);

  });
}