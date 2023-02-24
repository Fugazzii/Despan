import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { email } } = req;
    const { db } = await connectToDatabase();
        
    switch(method) {
        case "GET":
            try {
                const users = await db.collection("users")
                .find({ email: { $ne: email } })
                .sort({ timestamp: -1 })
                .toArray();
                res.status(200).json({ users });
            } catch (error) {
                res.status(500).json(error);
            }        
        break;

        case "PUT":
            const { sender } = req.body;
            // const requester = await db.collection("users").findOne({ email: sender });
            const user_to_add = await db.collection("users").findOne({ email });
            try {
                if(!user_to_add.requests) {
                    try {
                        const add_request = await db.collection("users")
                            .updateOne(
                                { email }, 
                                { $set: { requests: [sender] } }
                            );
                        res.status(201).send({ add_request });
                    } catch (error) {
                        res.status(500).send("Failure");
                    }
                } else {
                    const add_request = await db.collection("users")
                        .updateOne({ email }, { $push: { requests: sender } })
                    res.status(201).send({ add_request });
                }
            } catch (error) {
                res.status(500).send("Failed to send request");
            }
        break;
    }
}