const mongoose = require('mongoose');
const { Schema } = mongoose

const newsSchema = new Schema({
    title: { type: String, maxlength: 64, required: true }
});

const News = mongoose.model('news', newsSchema);

module.exports = News;
