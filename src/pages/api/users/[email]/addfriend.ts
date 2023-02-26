import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { email: accepter, answer } } = req;
    const { db } = await connectToDatabase();

    switch(method) {
        case "PUT":
            const { accepted } = await req.body;
            try {
                const empty_requests = await db.collection("users")
                .updateOne(
                    { email: accepter }, 
                    { $pull: { requests: accepted } }
                );

                if(answer) {
                    const accepted_ = await db.collection("users").findOne({ email: accepted });
                    if(accepted_.friends) {
                        await db.collection("users").updateOne(
                            { email: accepted },
                            { $push: { friends: accepter} }
                        );
                    } else {
                        await db.collection("users").updateOne(
                            { email: accepted },
                            { $set: { friends: [accepter] } }
                        );
                    }
                    const accepter_ = await db.collection("users").findOne({ email: accepter });

                    if(accepter_.friends) {
                        await db.collection("users").updateOne(
                            { email: accepter },
                            { $push: { friends: accepted} }
                        );
                    } else {
                        await db.collection("users").updateOne(
                            { email: accepter },
                            { $set: { friends: [accepter] } }
                        );
                    }
                } // endif answer  
                res.status(201).send({ empty_requests });
            } catch (error) {
                throw new Error("Failed to accept/reject");
            }
            break;
    }
}