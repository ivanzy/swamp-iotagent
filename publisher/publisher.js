const axios = require('axios')

module.exports.createEntity = (message, orion_address) => {

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

module.exports.updateEntity = (message, orion_address) => {

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
 