import { getSession } from "next-auth/react";


export default function AddFriends() {
    return (
        <div>
            Add Friends
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

}