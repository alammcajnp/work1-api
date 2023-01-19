import * as mongoose from 'mongoose';

export const LevelSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    strictPopulate: false,
    required: false
  },
  text: String,
  slug: String,
  description: String,
  created_at: { type: Date, default: Date.now }
});
