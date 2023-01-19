import { Document } from 'mongoose';

export interface User extends Document {
  readonly full_name: string;
  readonly email: string;
  readonly password: string;
  readonly mobile: string;
  readonly status: number;
  token: string;
  file: string;
  otp: number;
  readonly created_at: Date;
}
