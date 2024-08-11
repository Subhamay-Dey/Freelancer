type PostPayloadType = {
    content : string;
    image? : string;
    user_id : string;
}

type PostType = {
    id: number,    
    created_at: string,
    content: string,
    image?: string,
    likes_count: number,
    reply_count: number,
    users: any,
}

type UserType = {
    id: number,
    name: string,
    username: string,
    profile_image: string,
}