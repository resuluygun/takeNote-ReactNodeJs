
const mongoose = require ("mongoose");

const noteSchema =  mongoose.Schema({

     uid : {type : String, required :true },
     noteArray : {type: [{index: String,title : String, content : String}], required: true}

});

module.exports = mongoose.model("Note", noteSchema);