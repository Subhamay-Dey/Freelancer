import Env from "@/Env/Env"

export const getS3Url = (path: string) : string => {

    return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${path}`

}