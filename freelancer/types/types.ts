type PostPayloadType = {
    content : string;
    image? : string;
    user_id : string;
}

type PostType = {
    post_id: number,    
    user_id: string,
    content: string,
    image?: string,
    name: string,
    username: string,
    email: string,
    profile_image?: string,
    likes_count: number,
    reply_count: number,
    created_at: string,
    liked: boolean,
}

type UserType = {
    id: number,
    name: string,
    username: string,
    profile_image: string,
}