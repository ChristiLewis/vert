const { Schema, model } = require('mongoose');

const ContinueSchema = new Schema({
    writtenBy: {
        type: String
    },
    continueBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Continue = model('Continue', ContinueSchema);

module.exports = Continue;