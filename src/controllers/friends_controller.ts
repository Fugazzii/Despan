/* Request friendship */
export async function send_friend_request(from: string, to: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${to}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender: from
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Failed to send friend request");
    }
}

export async function unfriend(unfriender: string, unfriended: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${unfriended}/unfriend`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                unfriender
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Failed to unfriend");
    }
    
}
