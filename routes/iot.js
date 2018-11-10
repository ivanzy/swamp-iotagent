Entity = require('../models/entity');
Attribute = require('../models/attribute');
subscriber = require('../mqtt/subscribe');
process = require('../processor/process-message');

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
            process.createMessage(msg);
            subscriber.entityWatcher(msg);
         }
       });
     });
 };
 