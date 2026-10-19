import { UserResponse } from "@/lib/definision";

export async function getRawUsers():Promise<UserResponse | null> {

    try {
        const res = await fetch('https://dummyjson.com/users?limit=0', {
            next: { revalidate: 60 }
        })
        if (!res.ok) {
            return null;
        }
        const users = await res.json() as UserResponse;

        return users;

    } catch(err) {
        return null
    }
}