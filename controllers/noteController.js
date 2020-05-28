const Note = require("../models/noteModel");
const { v4: uuidv4 } = require('uuid');



exports.createNote = function (req, res){
    const note = {...req.body, index: uuidv4() };

    Note.updateOne(
        {uid : req.user._id},
        {$push : {noteArray : note}},
        function(err, updated){
            if(err) console.log(err);  
        }
    )
    res.send("Note - Create")

}

exports.getAllNotes = function (req, res){

    Note.findOne({uid : req.user._id}, function(err, notes){
        if (err) res.send(`Note - Get all notes - error ${err}`);
        else res.send(`Note - Get all notes - notes ${notes}`);
    })

    //res.send("Note - Get all notes")

}
exports.updateNote = function (req, res){

    
    const {title, content, index} = req.body;

    Note.updateOne({"uid" : req.user._id, "noteArray.index": index }, {"$set" : {
        "noteArray.$.title" : title,
        "noteArray.$.content" : content
    }}, function(err){
        if(err) res.send(err);
    });

    //console.log(req.body);
    res.send("Note - Update Note")

}
exports.deleteNote = function (req, res){

    //console.log(req.body);
    
    const indexNote = req.body.index;

    Note.findOneAndUpdate( {uid : req.user._id}, {
        $pull : { noteArray : { index : indexNote}}},
        function(err){
            if(err) res.send(err);
        }
    );
    //Note.findOneAndUpdate({uid : userId})
    res.send("Note - Delete Note")

}
