import Score from "@/modals/Score";
import { connectToDB } from "@/database/database";
import { NextRequest } from "next/server";

export const maxDuration = 10;

export const POST = async (req: NextRequest) => {
  const { name, speed } = await req.json();

  const userExists = async (name: string) => {
    let output = false;
    connectToDB();
    const user = await Score.find({ name: name });
    if (user.length > 0) {
      output = true;
    }
    return output;
  };

  try {
    connectToDB();

    if (await userExists(name)) {
      return new Response(
        JSON.stringify({ res: "Error", msg: "Player Already Exists" }),
        { status: 200 }
      );
    } else {
      const newScore = new Score({
        name,
        score: 0,
        speed,
      });
      await newScore.save();
      return new Response(JSON.stringify({ res: "ok", user: newScore }), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(`${error} Failed to create new user`, { status: 500 });
  }
};
