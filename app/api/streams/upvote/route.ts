import { NextRequest } from "next/server";
import { z } from "zod";

const upvoteSchem = z.object({
    userId: z.string(),
    streamId: z.string(),

})

export async function POST( req: NextRequest ) {

    const data = upvoteSchem.parse( await req.formData.json())


}