import Score from "@/modals/Score";
import { connectToDB } from "@/database/database";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const { name, score, speed } = await req.json();

  try {
    await connectToDB();
    const user = await Score.find({ name: name });

    if (score > user[0].score) {
      const update = await Score.findOneAndUpdate(
        { name: name },
        {
          score,
          speed,
        }
      );
      return new Response(JSON.stringify(update), { status: 200 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};


