const mongoose = require('mongoose');
const { Schema } = mongoose

const newsSchema = new Schema({
    title: { 
        type: String, 
        maxlength: 128, 
        required: true 
    },
    type: { 
        type:String, 
        maxlength:128,
        required:true 
    },
    link: { 
        type:String, 
        maxlength:128,
        required:true 
    },
    description: { 
        type:String, 
        maxlength:10000,
        required:true 
    },
    image:{ 
        type:String, 
        maxlength:10000, 
        required:false
    },
    createdAt: {
        type: Date,
        maxlength:128,
        default: Date.now,
        required:true
    }
});

const News = mongoose.model('news', newsSchema);

module.exports = News;
