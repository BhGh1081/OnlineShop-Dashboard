export async function fetchUsers() {

    try {
        const res = await fetch('https://dummyjson.com/users?limit=0', {
            next: { revalidate: 60 }
        })
        if (!res.ok) {
            throw new Error('Database error')
        }
        const totalUsers = await res.json();

        return totalUsers;
    } catch(err) {
        // throw new Error('Server Error', err);
        console.log('zerrrrrrrrrrrrrrrrt')
    }
}