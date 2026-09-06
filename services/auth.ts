import { cookies } from "next/headers";

export async function Authentication({ userName, password }: { userName: string, password: string }) {

    let res;
    try {

        res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })
    } catch (err) {
        throw new Error('Conection faild')
    }
    console.log('status', res.status)
    if (!res.ok) {
        if (res.status === 400) {
            throw new Error('Invalid UserName or Password');
        }
        throw new Error('Something went wrong')
    }

    const user = await res.json();
    return user;

}


export async function getUser() {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) return null;

    const res = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })

    if (!res.ok) {
        return null
    }

    return res.json();
}