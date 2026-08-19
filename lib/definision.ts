export interface menuItem {
    title: string,
    href: string
}

export type productType = {
    id: number,
    title: string,
    price: number,
    quantity: number,
    total: number,
    discountPercentage: number,
    discountedTotal: number,
    thumbnail: string
}
export type cartType = {
    id: number
    products: productType[];
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}

export type userType = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    accessToken: string,
    refreshToken: string
}

export type errorType = {
    userName?: string[],
    password?: string[]
}

export type serverRes = {
    message: string
}

/* export type authType =
    {status:'idle'} |
    {status: 'loading'} |
    {status: 'error', erro: errorType} |
    {status: 'success', data: userType} */
