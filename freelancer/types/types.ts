type PostPayloadType = {
    content : string;
    image? : string;
    user_id : string;
}

type CommentPayloadType = {
    content: string,
    image?: string,
    user_id: string,
    post_id: number,
}
            //Or
// type CommentPayloadType = PostPayloadType & {
//     post_id: number,
// }

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

type NotificationType = {
    user_id: string,
    post_id: number,
    type: number
    created_at: string,
    users: any
}

type CommentType = {
    id: number,
    user_id: string,
    post_id: number,
    content: string,
    image?: string,
    created_at: string,
    users: any
}

type ProfilePayloadType = {
    name: string;
    description?: string;
    profile_image?: string;
}