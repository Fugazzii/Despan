import { Fragment, FC } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { get_user, get_users_excluding } from "@/controllers";
import { USER } from "@/interfaces";
import AddFriend from "@/components/AddFriend";

interface Props {
    users: USER[],
    session: USER
};

const AddFriends:FC<Props> = ({ users, session }: Props) => {
    const router = useRouter();
    return (
        <div className="w-full flex flex-col justify-evenly items-center gap-3">
            {users.map((user: USER, idx: number) => (
                <Fragment key={idx}>
                    <AddFriend user={user} session={session} />
                </Fragment>
            ))}
        </div>
    )
}

export default AddFriends;

export async function getServerSideProps(context: any) {
    const sess = await getSession(context);

    const email = sess?.user?.email || "";
    const users: USER[]  = await get_users_excluding(email);

    const session = await get_user(email);

    return {
        props: { users, session }
    }
}