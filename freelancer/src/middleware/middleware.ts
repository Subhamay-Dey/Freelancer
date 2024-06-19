import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";

export async function middleware(request:NextRequest) {
    const supabase = createClient()
    const {data, error} = await supabase.auth.getUser()

    //if the user is not logged in
    if(data.user === null) {
        return NextResponse.redirect(new URL("/login?error=Please login first to access this route.", request.url))
    }

    return NextResponse.next()
}

//protecting routes
export const config = {
    matcher : []
}