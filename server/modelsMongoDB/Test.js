const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    title: { type: String, maxlength: 64, required: true }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
