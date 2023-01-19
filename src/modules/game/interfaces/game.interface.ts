import { Document } from 'mongoose';

export interface Game extends Document {
  readonly game_type: string;
  readonly slug: string;
  readonly description: string;
  readonly sshInfo: object;
  readonly created_at: Date;
}
