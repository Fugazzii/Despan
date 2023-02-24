import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import clientPromise from '../../../../libs/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import { get_user } from 'utils/api';
// import { USER } from '@/interfaces';
// import { connectToDatabase } from 'utils/mongo';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "",
        })
    ],
    secret: process.env.JWT_SECRET, 
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/dashboard",
        signOut: "/"
    },
    callbacks: {
    //     signIn: async ({ user, account, profile }) => {
    //         /* Gets user from database */
    //         const us: USER | null = await get_user(user?.email ? user?.email : "");
            
    //         if(!us) {
    //             try {
    //                 const { db } = await connectToDatabase();
    //                 let newUser = {
    //                     name: user.name,
    //                     email: user.email,
    //                     image: user.image,
    //                     username: user.email?.split("@")[0],
    //                     friends: [],
    //                     requests: []                
    //                 }
    //                 await db.collection("users").insertOne(newUser);
    //             } catch (err) {
    //                 console.error(err);
    //                 return false;
    //             }
    //         }   

    //         return true;
    //     },

        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt"
    }
})