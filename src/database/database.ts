import mongoose from "mongoose";

export const mongourl = process.env.NEXT_PUBLIC_MONGODB_URL || "";

let isConnected = false;

export const connectToDB = async () => {
  //@ts-ignore
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongourl, {
      dbName: "snake_game",
    });
    isConnected = true;
    console.log("mongoDB is Connected", process.env.MONGODB_URL);
  } catch (error: any) {
    console.log(error.message);
  }
};
