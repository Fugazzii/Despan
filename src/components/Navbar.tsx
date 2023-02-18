import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-1/2 h-20 flex flex-row justify-around items-center">
            <Link href="/dashboard" className="active">Dashboard</Link>
            <Link href="/chats" className="passive">Chats</Link>
            <Link href="/friends" className="passive">Friends</Link>
            <Link href="/addfriends" className="passive">Add friends</Link>
        </div>
    );
}