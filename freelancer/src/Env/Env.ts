
class Env {

    static SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!

    static S3_BUCKET: string = process.env.NEXT_PUBLIC_S3_BUCKET!
}

export default Env;