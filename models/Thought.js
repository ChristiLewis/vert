//ONLY IMPORT WHAT YOU NEED FROM THE MONGOOSE LIBRARY
const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({

    thoughtName: {
        type: String
    },

    createdBy: {
        type: String

        //username (The user that created this thought)
        //String
        //Required
    },

    createdAt: {
        type: Date,
        //Set default value to the current timestamp
        default: Date.now
        //Use a getter method to format the timestamp on query
    },

    thoughtText: {
        type: String

        //Required
        //Must be between 1 and 280 characters
    },
    reactions: []
    //reactions (These are like replies)
    //Array of nested documents created with the reactionSchema
});

//MAKE THE MODEL
const Thought = model('Thought', ThoughtSchema);
//EXPORT THE MODEL
module.exports = Thought;