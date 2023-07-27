import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req: any, {params}: any) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params._id,
        }).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}