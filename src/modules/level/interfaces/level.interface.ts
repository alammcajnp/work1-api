import { Document } from 'mongoose';

export interface Level extends Document {
  readonly game_id: string;
  readonly text: string;
  readonly slug: string;
  readonly description: string;
  readonly created_at: Date;
}
