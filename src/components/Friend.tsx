import Image from "next/image";
import { unfriend } from "@/controllers";

export default function Friend({ user, session }: any) {

    const handle_unfriend = async () => {
        const unfriender: string = session?.user?.email || "";
        const unfriended: string = user.email || "";
        await unfriend(unfriender, unfriended);
    }

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

            <button type="button" onClick={handle_unfriend} 
            className="add_button bg-rose-700 hover:bg-rose-600 focus:ring-[#4285F4]/50
                dark:focus:ring-[#4285F4]/55 flex flex-col justify-center">
                Unfriend
            </button>
        </div>
    );
}