import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now }
});
