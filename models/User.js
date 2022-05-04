//IMPORT THE PARTS NEEDED FROM THE MONGOOSE LIB
const { Schema, model } = require('mongoose');
const friendSchema = require('./Friend');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'A Name is Required',
            trim: true
        },

        email: {
            type: String,
            required: 'Please enter a valid email address',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        continues: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Continue'
            }
        ],
    
        friends: [
            {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        //MONGOOSE RETURNS THIS VIRTUAL SO THE ID IS NA
        id: false
    }
);

//ADD VIRTUAL TO COUNT THE NUMBER OF COMMENTS ON RETRIEVAL
UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friend) => total + friend.reactions.length + 1, 0);
});

//MAKE THE MODEL
const User = model('User', UserSchema);
//EXPORT THE MODEL
module.exports =  User;
