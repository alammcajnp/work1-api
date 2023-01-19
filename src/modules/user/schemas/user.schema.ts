import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  full_name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  password: String,
  status: Number,
  mobile: String,
  token: String,
  file: String,
  otp: Number,
  created_at: { type: Date, default: Date.now }
});
