import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import Image from "next/image";

import { useState } from "react";

import { get_user, change_username } from "utils/api";

export default function Dashboard({ user }: any) {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        }
    });

    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>("");

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div>
                {session?.user?.image && 
                <Image 
                    src={session?.user?.image}
                    className="rounded-full"
                    alt="..." 
                    width={100} 
                    height={100}
                />}
            </div>
            <br />
            <p className="capitalize">{user?.name}</p>
            <div className="w-1/3 h-8 m-4 flex flex-row justify-start items-center">
                <input 
                    type="text"
                    onChange={e => setNewUsername(e.target.value)}
                    defaultValue={user?.username ? user?.username : ""}
                    placeholder="Change username"
                    className="w-3/4 italic h-full p-2 rounded-md border-none outline-none text-black"
                />
                &nbsp;
                <button type="button" onClick={() => {
                    change_username(user?.email, newUsername);
                    setShowMessage(true);
                }}
                className={`w-1/4 h-full focus:outline-none text-white bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900`}>
                    Submit
                </button>
            </div>
            <button type="button" onClick={() => signOut()} 
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 
            focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 
            mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Log Out
            </button>

            <div id="alert-3" 
                className={`${showMessage ? "flex" : "hidden"} p-4 mb-4 text-green-800 rounded-lg bg-green-50
                dark:bg-gray-800 dark:text-green-400`} role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium">
                    Username has successfully been updated.
                </div>
                <button onClick={() => setShowMessage(false)} 
                type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const session: Session | null = await getSession(context);
    // if(!session) {
    //     return {
    //         permanent: false,
    //         destination: '/'
    //     }
    // }
    const email = session?.user?.email || "";
    const user = await get_user(email);
    return {
        props: { session, user }
    }
}