var mongoose = require('mongoose');

//Create the TabsSchema
var TabSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
      type: String,
      require: true
    },
    lyrics: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    privacy: {
        type: Boolean,
        required: true
    },
    revisionDate: {
      type: Date,
      required: false
    },
    versionNumber: {
      type: Number,
      required: true
    }

});

module.exports = TabSchema;
