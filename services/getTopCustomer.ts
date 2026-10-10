import { CartType, UserType } from "@/lib/definision";

export function getTopCustomer(carts: CartType[], users: UserType[], limit: number) {

    const spendByUser = new Map<number, {user:UserType, total: number, order: number }>();

    const userById = new Map(users.map((user) => [user.id, user]));

    for (const cart of carts) {
        const user = userById.get(cart.userId);

        if(!user) continue;

        const current = spendByUser.get(cart.userId) ?? {user ,total: 0, order: 0 }
        spendByUser.set(cart.userId, {
            user,
            total: cart.total + current.total,
            order: current.order + 1
        })
    }

    return Array.from(spendByUser, ([userId, {user, total, order}]) => {
        return {
            image: user.image,
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            order,
            totalSpend: total
        }
    }).sort((a,b) => b.totalSpend - a.totalSpend).slice(0, limit)
}