import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { accepter } } = req;
    const { db } = await connectToDatabase();
        
    switch(method) {
        case "PUT":
            const { accepted } = await req.body;
            try {
                /* Accept */
            } catch (error) {
                res.status(500).send("Failed to unfriend");
            }
            break;
    }
}