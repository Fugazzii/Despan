import { Db, MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";
let dbName = process.env.MONGODB_NAME;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

if (!dbName) {
    throw new Error(
        "Please define the MONGODB_DB environment variable inside .env.local"
    );
}

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    const client: any = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = await client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}