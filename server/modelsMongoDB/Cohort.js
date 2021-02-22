const mongoose = require("mongoose");
const { Schema } = mongoose;

const cohortSchema = new Schema({
  number: { 
      type: Number, 
      required: true 
  },
  initialDate: {
       type: Date,
       required: true
  },
  teacher: {
      type: String,
      required: true
  },
  student: { 
      type: String, 
      maxlength: 64, 
      required: true 
  },
});

const Cohort = mongoose.model('cohort', cohortSchema);

module.exports = Cohort