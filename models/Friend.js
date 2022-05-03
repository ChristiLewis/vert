const { Schema, Types } = require('mongoose');

const friendSchema = new Schema({
    friendId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    friendName: {
        type: String,
        required: 'We need to know the name of your friend!',
        unique: true,
        validate: [/A-Za-z/, 'Please enter a name using letters']
    },
});

module.exports = friendSchema;