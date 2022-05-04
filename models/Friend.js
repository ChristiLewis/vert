const { Schema, model } = require('mongoose');

const FriendSchema = new Schema({
  title: String,
  body: String
});

const Note = model('Friend', FriendSchema);

module.exports = Friend;