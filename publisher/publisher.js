const axios = require('axios')

module.exports.createEntity = (message, orion_address) => {
  console.log("\n\nGOING TO CREATE ENTITY:" + message + "\n\n");
  axios
    .post(`http://${orion_address}:1026/v2/entities`, message)
    .then(res => {
      console.log(
        `MESSAGE SENT TO ORION - statusCode: ${
          res.statusCode
        }, message is ${message} to http://${orion_address}:1026/v2/entities`
      );
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports.updateEntity = (message, orion_address, entity_name) => {  
   axios
     .patch(`http://${orion_address}:1026/v2/entities/${entity_name}/attrs`, message)
     .then(res => {
       console.log(
         `MESSAGE SENT TO ORION - statusCode: ${
           res.statusCode
         }, message is ${message} to http://${orion_address}:1026/v2/entities/${entity_name}/attrs`
       );
       console.log(res);
     })
     .catch(error => {
       console.error(error);
     });
 };
 