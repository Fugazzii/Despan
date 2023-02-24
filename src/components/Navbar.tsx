import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    console.log(router.pathname);

    const handle_active = (valid_url: string) => router.pathname === valid_url ? "active" : "passive";

    return (
        <div className="w-1/2 h-20 flex flex-row justify-around items-center">
            <Link href="/dashboard" 
                className={handle_active("/dashboard")}>Dashboard
            </Link>
            <Link href="/chats" 
                className={handle_active("/chats")}>Chats
            </Link>
            <Link href="/friends" 
                className={handle_active("/friends")}>Friends
            </Link>
            <Link href="/addfriends" 
                className={handle_active("/addfriends")}>Add friends
            </Link>
        </div>
    );
}