import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery");
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "snake_game",
    });
    isConnected = true;
    console.log("mongoDB is Connected", process.env.MONGODB_URL);
  } catch (error) {
    console.log(error.message);
  }
};
