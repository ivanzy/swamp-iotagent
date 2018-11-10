Entity = require('./models/entity')


module.exports.loadEntities = () =>{
  Entity.getEntity((err, msg)=>{
    if (err) throw err;
    else{
       module.exports.entities = msg;
    }
 });
}


module.exports.findTresholdByField = field => {
  for (param of module.exports.treshold ) {
    if (field == param.field) return (param);
  }
  return false;
};
