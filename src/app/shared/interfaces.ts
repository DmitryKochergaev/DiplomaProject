export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}

export interface Card {
    id?: string
    title: string
    pic: string
    text: string
    type: string
    price?: string
    date: Date
}

export interface FbCreateResponse {
    name: string

}

export interface News {
    id?: string
    title: string
    text: string
    date: Date
}

export interface Comment {
    id?: string
    name: string
    text: string
    replies?: Comment[]
    date: Date

}
