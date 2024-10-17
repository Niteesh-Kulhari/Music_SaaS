import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import { z } from "zod";

// Zod schema for downvote
const downvoteSchem = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "No user found",
    });
  }

  try {
    const data = downvoteSchem.parse(await req.json());
    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error while downvoting",
    });
  }
}
