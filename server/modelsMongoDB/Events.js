const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String, 
        maxlength: 64, 
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    },
    start:{
        type: Date, 
        required: true
    },
    end:{
        type: Date,
        required: true
    }
});

const Events = mongoose.model('events', eventSchema);

module.exports = Events;
