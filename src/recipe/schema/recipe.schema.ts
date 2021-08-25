import { Schema } from "mongoose";

export const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  punctuation: {
    type: Number,
    default: 0
  },
  healthScore: {
    type: Number,
    default: 0
  },
  steps: [String],
  dishTypes: [String]
});
