const { Schema, model, Types } = require('mongoose');
//IMPORT FOR GETTER FUNCTIONALITY
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
    {
        //CUSTOM ID TO DIFFERENTIATE FROM UNIVERSAL PARENT COMMENT ID
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
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
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//ADD VIRTUAL TO COUNT THE NUMBER OF REPLIES ON RETRIEVAL
ContinueSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

const Continue = model('Continue', ContinueSchema);

module.exports = Continue;