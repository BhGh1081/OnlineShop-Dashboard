import { cookies} from "next/headers";

export async function Authentication({ userName, password }: { userName: string, password: string }) {

    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: userName,
            password: password
        })
    })
    if (!res.ok) {
        throw new Error('Invalid Credential');
    }

    const user = await res.json();
    return user;
}


export async function getUser(){

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken) return null;

    const res = await fetch('https://dummyjson.com/auth/me',{
        method: 'GET',
        headers: {'Authorization': `Bearer ${accessToken}`},
    })

    if(!res.ok){
        return null
    }

    return res.json();
}