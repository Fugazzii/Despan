import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { email } } = req;
    const { db } = await connectToDatabase();
        
    switch(method) {
        case "GET":
            try {
                const user = await db.collection("users").find({ email: { $ne: email }});
                res.status(200).json({ user });
            } catch (error) {
                res.status(500).json(error);
            }        
        break;
    }
}