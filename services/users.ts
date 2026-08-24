export async function fetchUsers() {

    try {
        const res = await fetch('https://dummyjson.com/users', {
            next: { revalidate: 60 }
        })
        if (!res.ok) {
            throw new Error('Database error')
        }
        const users = await res.json();
        const totalUsers = users.length

        return totalUsers;
    } catch {
        console.log('Someting went wrong');
    }
}