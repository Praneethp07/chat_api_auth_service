//signup and login model
const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});

const signUpUserSchema = new mongoose.Schema({
    _id:String,
    userName:String,
    firstName:String,
    lastName:String,
    password:String,
    dateOfBirth:String,
    emailId:{ type: String, unique: true },
    organizationID:String,
});

const NewUser = mongoose.model('NewUser',signUpUserSchema);
module.exports = {NewUser};