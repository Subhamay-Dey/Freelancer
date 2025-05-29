import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/supabaseServer";
import { cookies } from "next/headers";

export async function middleware(request:NextRequest) {
    const supabase = createClient(cookies())
    const {data} = await supabase.auth.getUser()

    //if the user is not logged in
    if(data.user === null) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    //if the user is logged in
    return NextResponse.next()      
}

//protecting routes
export const config = {
    matcher : ["/", "/profile", "/search", "/notifications"]
}