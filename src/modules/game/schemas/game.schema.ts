import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  game_type: String,
  slug: String,
  description: String,
  sshInfo: Object,
  created_at: { type: Date, default: Date.now }
});
