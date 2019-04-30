# SWAMP IoT-Agent

The IoT Agent is the FIWARE module responsible to translate non-NGSI data in the NGSI
format and sent it to Orion. There  is not an official and stable IoT Agent that integrates with LoRaWAN, especially with modules from loraserver.io.As the official IoT Agent, our IoT Agent uses MongoDB to store data. However,the IoT Agent does not store every message, just some information about the
sensor/entity mapping.

In order to create a mapping between a IoT LoRa device and a entity, there is the need to inform IoT Agent about this mapping. 
```
curl -iX POST \
  'http://localhost:3456/iot/devices' \
  -H 'Content-Type: application/json' \
  -H 'fiware-service: openiot' \
  -H 'fiware-servicepath: /' \
  -d '{
 "devices": [
   {
     "device_id":   "device",
     "entity_name": "urn:ngsd-ld:IoTDevice:1",
     "entity_type": "LoRaSensor",
     "attributes": [
      { "object_id": "S", "name": "timestamp",  "type": "Number" },
      { "object_id": "I", "name": "identifier",  "type": "Number" },
      { "object_id": "H1", "name": "moisture1",  "type": "Number" },
      { "object_id": "H2", "name": "moisture2",  "type": "Number" },
      { "object_id": "H3", "name": "moisture3",  "type": "Number" }
     ],
	 "dev_eui": "0102030405060708",
	 "application_id": "1",
	 "broker_address":"mosquitto",
	 "orion_address": "orion"
   }
 ]
}'
```


'http://localhost:3456/iot/devices' -> address of the running instance of the IoT Agent <br>
"entity_name": "urn:ngsd-ld:IoTDevice:1" -> name of the entity that will be created in Orion<br>
"entity_type": "LoRaSensor" -> type of the entity that will be created in Orion<br>
"dev_eui": "0102030405060708" -> device EUI of LoRa<br>
"application_id": "1" -> application ID of the sensors (LoRa app Service that provides this information)<br>
"broker_address":"mosquitto" -> address of the MQTT broker<br>
"orion_address": "orion" -> address of the Orion broker<br>

In order to check the devices in IoT Agent:
```
curl -iX GET 'http://localhost:3456/iot/devices' 
```








  
