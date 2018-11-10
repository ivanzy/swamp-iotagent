const mqtt = require("mqtt");
const config = require("nconf");
const param = require("../param");
const processor = require("../processor/process-message");
const LoraMessage = require('../models/lora-message');



module.exports.sub = callback => {

  console.log(`subscribing to mqtt://${config.get("MQTT_BROKER")}`);
  //connecting to broker
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);
  //subscribing to configure topics
  for (topic of param.mqttTopics) {
    client.subscribe(topic);
  }
  monitoreMessage(client);
};

module.exports.subscribeToTopic = (topic) => {
  console.log(`Subscribing to ${topic}`);
  //connecting to broker
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);

  //subscribing to configure topics
  client.subscribe(topic);

  monitoreMessage(client);
  
};

var monitoreMessage = (client) =>{
  //message event
  client.on("message", (topic, message) => {
    console.log(
      `MQTT message topic: ${topic} payload:${message.toString()} time:${new Date()}`
    ); 
    message = message.toString();
    console.log(message);
 
    //add to lora message collection
    LoraMessage.addLoraMessage(JSON.stringify(message.toString()), (err, msg) => {
      if (err) throw err;
    });
  });
}