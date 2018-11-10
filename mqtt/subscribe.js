const mqtt = require("mqtt");
const config = require("nconf");
const param = require("../param");
const processor = require("../processor/process-message");
const LoraMessage = require('../models/lora-message');



module.exports.entityWatcher = (entity) => {
  let topic =   (`application/${entity.application_id}/device/${entity.dev_eui}/rx`);

  console.log(`Subscribing to ${topic}`);
  //connecting to broker
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);

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
    
 
    //add to lora message collection
    LoraMessage.addLoraMessage(message, (err, msg) => {
      if (err) throw err;
    });

    //process a new message
    processedMessage = processor.processMessage(entity,message);

  });
}