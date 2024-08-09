import Env from "@/Env/Env"

import moment from "moment"

export const getS3Url = (path: string) : string => {

    return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${path}`

}

export const formatDate = (date: string) : string => {
    return moment(date).fromNow();
}