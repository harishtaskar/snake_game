import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  //@ts-ignore
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "snake_game",
    });
    isConnected = true;
    console.log("mongoDB is Connected", process.env.MONGODB_URL);
  } catch (error: any) {
    console.log(error.message);
  }
};
