import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db"

// Youtube regex
const YT_REGEX = new RegExp("^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}")

// Zod Schema to validate data
const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})


export async function POST(req: NextRequest){

    try {
        // Validating data through zod
        const data = CreateStreamSchema.parse(await req.json());
        // checking link with the help of regex
        const isYt = YT_REGEX.test(data.url);

        if(!isYt){
            return NextResponse.json({
                message: "Wrong URL Format"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId: extractedId,
                type: "Youtube"
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }

}