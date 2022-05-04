const { Schema, model, Types } = require('mongoose');
//IMPORT FOR GETTER FUNCTIONALITY
const dateFormat = require('../utils/dateFormat');

//reactions (These are like reactions)
//Array of nested documents created with the reactionSchema
const reactionSchema = new Schema(
    {
        //CUSTOM ID TO DIFFERENTIATE FROM UNIVERSAL PARENT CONTINUE ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'No time to be shy, this is required!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'We need an author!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ContinueSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: 'We need an author!',
            trim: true
        },
        continueBody: {
            type: String,
            required: 'No time to be shy, this is required!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//ADD VIRTUAL TO COUNT THE NUMBER OF reactions ON RETRIEVAL
ContinueSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Continue = model('Continue', ContinueSchema);

module.exports = Continue;