import { Schema, model, models } from "mongoose";

const scoreSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  score: {
    type: Number,
    required: [true, "Score is required"],
  },
  speed: {
    type: String,
    required: [true, "speed is required"],
  },
});

const Score = models.User || model("User", scoreSchema);

export default Score;
