import { UserResponse } from "@/lib/definision";

export async function getUsers():Promise<number | null> {

    try {
        const res = await fetch('https://dummyjson.com/users?limit=0', {
            next: { revalidate: 60 }
        })
        if (!res.ok) {
            return null;
        }
        const {total} = await res.json() as UserResponse;

        return total;

    } catch(err) {
        return null
    }
}