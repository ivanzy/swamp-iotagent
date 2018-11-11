Entity = require('./models/entity')


module.exports.loadEntities = () =>{
  Entity.getEntity((err, msg)=>{
    if (err) throw err;
    else{
       module.exports.entities = msg;
    }
 });
}

//Subscribe in all entities which exist