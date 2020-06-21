const Note = require("../models/noteModel");



exports.createNote = function (req, res) {
        // const note = { ...req.body, index: uuidv4() };
        const note = req.body;

        Note.updateOne(
            { uid: req.user._id },
            { $push: { noteArray: note } },
            function (err, updated) {
                if (err) res.send(false);
            }
        )
        res.send(true)

}

exports.getAllNotes = function (req, res) {
        Note.findOne({ uid: req.user._id }, function (err, notes) {
            if (err) res.send(false);
            //else res.send(`Note - Get all notes - notes ${notes}`);
            else res.json(notes);
        })
        //res.send("Note - Get all notes")
    
}
exports.updateNote = function (req, res) {

        const { title, content, index } = req.body;
        Note.updateOne({ "uid": req.user._id, "noteArray.index": index }, {
            "$set": {
                "noteArray.$.title": title,
                "noteArray.$.content": content
            }
        }, function (err) {
            if (err) res.send(false);
        });

        res.send(true)
    

}
exports.deleteNote = function (req, res) {

        const indexNote = req.body.index;
        console.log(indexNote);
        
        Note.findOneAndUpdate({ uid: req.user._id }, {
            $pull: { noteArray: { index: indexNote } }
        },
            function (err) {
                if (err) res.send(false);
            }
        );
        //Note.findOneAndUpdate({uid : userId})
        res.send(true)
    
}
