import { z } from 'zod';


export async function Authentication({ userName, password }: { userName: string, password: string }) {

    const res = await fetch('https://dummyjson.com/user/login', {
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


export async function fetchUsersData() {

    try {
        const res = await fetch('https://dummyjson.com/users', {
            next: { revalidate: 60 }
        })
        if (!res.ok) {
            throw new Error('Database error')
        }
        const users = await res.json();
        const totalUsers = users.lengh

        return totalUsers;
    } catch {
        console.log('Someting went wrong');
    }
}