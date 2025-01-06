import mongoose from 'mongoose'; // Ensure mongoose is imported

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: [/.+@.+\..+/, 'Please enter a valid email address'], 
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);


export default User;
