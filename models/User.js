//IMPORT THE PARTS NEEDED FROM THE MONGOOSE LIB
const { Schema, model } = require('mongoose', 'mongoose-unique-validator');

//UNIQUE VALIDATOR FROM https://www.codegrepper.com/code-examples/javascript/mongoose+required+unique+validator
//var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

// var mySchema = mongoose.Schema(/* put your schema definition here */);
// mySchema.plugin(uniqueValidator);

//EMAIL VALIDATOR STATEMENTS FROM https://www.codegrepper.com/code-examples/whatever/mongoose+validate+match+regex
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


// const FriendSchema = new Schema({
//     friendId: {
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId(),
//         ref: 'User'
//     },

//     friendName: {
//         type: String,
//         required: 'We need to know the name of your friend!',
//         unique: true,
//         validate: [/A-Za-z/, 'Please enter a name']
//     },
// });

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
            trim: true,
            unique: true,
            required: 'A valid email address is required',
            // unique: true,
            //REGEX FROM ADRIAN BIENAS https://stackoverflow.com/users/9158604/adrian-bienias
            // match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please enter a valid e-mail address']
            // FROM https://www.codegrepper.com/code-examples/whatever/mongoose+validate+match+regex
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
        // friends: [FriendSchema]
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
    return this.friends.length;
});

//MAKE THE MODEL
const User = model('User', UserSchema);
//EXPORT THE MODEL
module.exports = User;
