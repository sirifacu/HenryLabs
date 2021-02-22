const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  first_name:{
    type: String,
    require: true
  },
  last_name:{
    type: String,
    require: true
  },
  date_of_birth:{
    type: Date,
  },
  role:{
    type: Number,
  },
  email:{
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  address:{
    type: String,
  },
  city:{
    type: String,
  },
  state:{
    type: String,
  },
  country:{
    type: String,
  },
  nationality:{
    type: String,
  },
  image:{
    type: String,
    data: Buffer,
  },
  description:{
    type: String,
  },
  password:{
    type: String,
    select: false,
    require: true,
  },
  cellphone: String,
  
  recovery_token: String,
  
  password_reset_expires: Boolean,
  
  github_user: String,
  
  google_user: String,
  
  codewars_rank: Number,
  
  codewars_points: Number,
  
  migrations_quantity: Number,
  
  created_at:{
    type: Date,
    default: Date.now
  }
  
});

userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password, this.password)
};

const User = mongoose.model('user', userSchema);

module.exports = User;
