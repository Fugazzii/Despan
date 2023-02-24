import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { unfriended } } = req;
    const { db } = await connectToDatabase();
        
    switch(method) {
        case "PUT":
            const { unfriender } = await req.body;
            try {
                const unfriend = await db.collection("users").updateOne(
                    { email: unfriender },
                    { $pull: { friends: unfriended } }
                );
                res.status(201).send({ unfriend });
            } catch (error) {
                res.status(500).send("Failed to unfriend");
            }
            break;
    }
}