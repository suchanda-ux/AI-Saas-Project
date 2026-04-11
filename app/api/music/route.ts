import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse(" Prompt is required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }
  
  const input = {
      prompt,
      duration: 90,
    };

    const output = await replicate.run("stability-ai/stable-audio-2.5", {
      input,
    });

    console.log("[MUSIC_OUTPUT]", output);

    const audioUrl = Array.isArray(output) ? output[0] : output;

    if (!isPro) {
    await increaseApiLimit();
   }

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}