import Score from "@/modals/Score";
import { connectToDB } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectToDB();
    const scores = await Score.find({}).sort({ score: -1 });

    return new Response(JSON.stringify(scores), { status: 200 });
  } catch (error) {
    return new Response("Failed to find posts for this profile", {
      status: 500,
    });
  }
};

