const axios = require("axios");

module.exports.createEntity = (message, orion_address) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "Fiware-Service": "openiot",
      "Fiware-ServicePath": "/"
    }
  };

  console.log("\n\nGOING TO CREATE ENTITY:" + message + "\n\n");
  axios
    .post(
      `http://${orion_address}:1026/v2/entities`,
      message,
      axiosConfig
    )
    .then(res => {
      console.log(
        `MESSAGE SENT TO ORION - statusCode: ${
          res.statusCode
        }, message is ${JSON.stringify(message)} to http://${orion_address}:1026/v2/entities`
      );
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports.updateEntity = (message, orion_address, entity_name) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "Fiware-Service": "openiot",
      "Fiware-ServicePath": "/"
    }
  };
  axios
    .patch(
      `http://${orion_address}:1026/v2/entities/${entity_name}/attrs`,
      message
    )
    .then(res => {
      console.log(
        `MESSAGE SENT TO ORION - statusCode: ${
          res.statusCode
        }, message is ${JSON.stringify(message)} to http://${orion_address}:1026/v2/entities/${entity_name}/attrs`
      );
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
};
