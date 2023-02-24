import Image from "next/image";
import { send_friend_request } from "@/controllers";

export default function AddFriend({ user, session }: any) {
    const handle_request = async () => {
        const sender_email: string = session?.user?.email || "";
        await send_friend_request(sender_email, user.email);
        alert(`${sender_email} has successfully sent friend request to ${user.email}`);
    }
    console.log(user.requests, session?.user?.email);
    return (
        <div className="w-1/2 flex flex-row justify-evenly items-start">
            <div>
                {user.image && 
                    <Image 
                        src={user.image} 
                        alt="..." 
                        width={50} 
                        height={50} 
                        className="rounded-full"
                    />
                }
            </div>

            <div className="flex flex-col justify-center items-start w-1/2">
                <p className="capitalize text-white font-bold break-none text-sm">{user.name}</p>
                <sub className="text-gray-300 text-xs">{user.email}</sub>
            </div>

            {!user.requests || !user.requests.includes(session?.user?.email) ?
            (
                <button type="button" onClick={() => handle_request()} 
                className="add_button bg-blue-700 hover:bg-blue-600 focus:ring-[#4285F4]/50
                    dark:focus:ring-[#4285F4]/55">
                    Add Friend
                </button>    
            ) :
            (
                <button type="button" disabled={true} 
                className="add_button bg-zinc-800 flex flex-col justify-center">
                    Sent 🗸
                </button>    
            )
            }
        </div>
    );
}