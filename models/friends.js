const mongoose = require('mongoose');

let friendSchema = new mongoose.Schema({
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
