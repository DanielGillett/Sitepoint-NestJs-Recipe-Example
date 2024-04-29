import { Document } from 'mongoose';
export interface Recipe extends Document {
  title: string;
  description: string;
  category: string;
  ingredients: Array<string>;
  instructions: string;
}
