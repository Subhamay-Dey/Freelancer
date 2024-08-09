type PostPayloadType = {
    content : string;
    image? : string;
    user_id : string;
}

type PostType = {
    id: number,
    content: string,
    image?: string,
    likes_count: number,
    reply_count: number,
    created_at: string,
    users: any,
}

type UserType = {
    id: number,
    name: string,
    username: string,
    profile_image: string,
}