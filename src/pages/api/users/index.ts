import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { db } = await connectToDatabase();
        
    switch(method) {
        case "GET":
            try {
                const users = await db.collection("users").find().sort({ timestamp: -1 }).toArray();
                res.status(200).json({ users });
            } catch (error) {
                res.status(500).json(error);
            }        
        break;
    }
}