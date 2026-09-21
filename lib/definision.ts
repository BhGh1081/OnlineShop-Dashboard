import Orders from "@/app/dashboard/orders/page"
import { number } from "zod"

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
export type CartType = {
    id: number
    products: productType[];
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string
    bloodGroup: string,
    height: number,
    weight: number,
    eyeColor: string,
    hair: {
        color: string,
        type: string
    },
    ip: number,
    address: {
        address: string,
        city: string,
        state: string,
        stateCode: string,
        postalCode: string,
        coordinates: {
            lat: number,
            lng: number
        },
        country: string
    },
    macAddress: string,
    university: string,
    bank: {
        cardExpire: string,
        cardNumber: string,
        cardType: string,
        currency: string,
        iban: string
    },
    company: {
        department: string,
        name: string,
        title: string,
        address: {
            address: string,
            city: string,
            state: string,
            stateCode: string,
            postalCode: string,
            coordinates: {
                lat: number,
                lng: number
            },
            country: string
        }
    },
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: {
        coin: string,
        wallet: string,
        network: string
    },
    role: string
}

export type errorType = {
    userName?: string[],
    password?: string[]
}

export type serverRes = {
    message: string
}

export type AuthType = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string
    accessToken: string
    refreshToken: string
}


export type InitialType = {
    user: AuthType | null,
    accessToken: string | null,
    isAuthenticate: boolean
}


export type CartsResponse = {
    carts:
    {
        id: number,
        products: productType[],
        total: number,
        discountedTotal: number,
        userId: number,
        totalProducts: number,
        totalQuantity: number
    }[],
    total: number,
    skip: number,
    limit: number
}

export type UserResponse = {
    users: UserType[],
    total: number,
    skip: number,
    limit: number
}

export type ChartDataPoint = {
    date: string
    orders: number,
    revenue: number
}


export type CartSummery = {
    totalOrders: number,
    totalCustomers: number,
    totalRevenue: number
}