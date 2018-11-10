Entity = require('../models/entity');
Attribute = require('../models/attribute');
subscriber = require('../mqtt/subscribe');


module.exports = router => {
   //get message by id
   router.route("/id/:_id").get((req, res) => {
      RawMessage.getRawMessageById(req.params._id, (err, msg) => {
       if (err) throw err;
       else res.json(msg);
     });
   });
 
   //path to register a new entity
   router
     .route("/devices")
     .get((req, res) => {
      Entity.getEntity((err, msg) => {
         if (err) throw err;
         else res.json(msg);
       });
     })
     //post new message
     .post((req, res) => {
       let msg = req.body.devices[0];
      //  console.log(`new entity is going to be register: ${JSON.stringify(msg)}`);
      //  console.log(msg.entity_name);
      //  console.log(msg.entity_type);
      //  console.log(msg.timezone);
      //  console.log("Attributes: "+ msg.attributes+ " type: " +typeof(msg.attributes));
      //  console.log(msg.dev_eui);
      //  console.log(msg.application_id);
      //  console.log(msg.broker_address);

       Entity.addEntity(msg, (err, msg) => {
         if (err) throw err;
         else{
            res.json(msg);
            for(attribute of msg.attributes){
               console.log(attribute);
               attribute.entity = msg.entity_name;
               Attribute.addAttribute(attribute, (err,attribute) =>{
                  if(err) throw err;
               });

            }
            subscriber.subscribeToTopic(`application/${msg.application_id}/device/${msg.dev_eui}/rx`);
         }
       });
     });
 };
 