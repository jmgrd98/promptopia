import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req: any) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate("creator", "username image");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}