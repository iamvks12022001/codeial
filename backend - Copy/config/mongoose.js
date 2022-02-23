const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error in connecting the database"));

db.once('open',function(){
    console.log('Connected to Database ::Mongo DB');
});

module.exports=db;
