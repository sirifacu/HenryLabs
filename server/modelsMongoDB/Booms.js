const mongoose = require("mongoose");
const { Schema } = mongoose;

const boomsSchema = new Schema({
  student: { type: String, maxlength: 100, required: false },
  previousStudies: { type: String, maxlength: 100, required: false },
  position: { type: String, maxlength: 100, required: false },
  company: { type: String, maxlength: 100, required: false },
  country: { type: String, maxlength: 64, required: false },
  incomeImprovement: { type: String, required: false },
  whatYouDidBefore: { type: String, maxlength: 200, required: false },
  thanks: { type: String, maxlength: 200, required: false },
  comments: { type: String, maxlength: 200, required: false },
  createdAt: { type: Date, maxlength: 128, required: true },
  status: { type: String, enum :['Pendiente', 'Aceptado', 'Rechazado'], default: 'Pendiente'},
});

const Booms = mongoose.model("booms", boomsSchema);

module.exports = Booms;
