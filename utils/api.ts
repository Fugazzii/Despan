import { USER } from "@/interfaces";

const FULL_DOMAIN = process.env.FULL_DOMAIN || "http://localhost:3000";

export async function get_user(email: string): Promise<USER> {
    try {
        const response = await fetch(`${FULL_DOMAIN}/api/users/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        return data.user;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
}

export async function change_username(email: string, username: string) {
    if(!username.length) username = email.split("@")[0];

    try {
        const response = await fetch(`${FULL_DOMAIN}/api/users/${email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        });
        console.log(response);
    } catch (error) {
        throw new Error("Failed to change username");
    }
}