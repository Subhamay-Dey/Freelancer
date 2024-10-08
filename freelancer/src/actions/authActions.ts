"use server"

import { LoginValidator, RegisterValidator } from '@/validations/authSchema';
import { errors } from '@vinejs/vine';
import {createClient} from "@/supabase/supabaseServer";
import {createActionClient} from "@/supabase/actions"
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

export async function registerAction(prevState:any, formdata:FormData) {

    const cookieStore = cookies()
    const supabase = createActionClient(cookieStore)

    try {
        const data = {
            name: formdata.get("name"),
            username: formdata.get("username"),
            email: formdata.get("email"),
            password: formdata.get("password"),
            password_confirmation: formdata.get("password_confirmation"),
        }
        const payload = await RegisterValidator.validate(data);

        // *Check user name if exits
        const {data: userData, error} = await supabase
        .from("users")
        .select("id")
        .eq("username", payload.username)

        console.log("The user data is", userData);
        console.log("The error is", error);

        if(userData && userData?.length > 0) {
            return {
                status: 400,
                error: {
                    username: "Username is already taken, please use another username."
                }
            }
        }

        const {error:signupErr} = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options:{
                data:{
                    name: payload.name,
                    username: payload.username,
                }
            }
        })

        if(signupErr) {
            return {
                status: 400,
                error: {email: signupErr.message}
            }
        }

        await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password,
        })
        
    } 
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return {status: 400, errors: error.messages};
        }
    }

    return redirect("/");
}

export async function loginAction(prevState:any, formdata:FormData) {

    try {

        const cookieStore = cookies()
        const supabase = createActionClient(cookieStore)
        
        const data = {
            email: formdata.get("email"),
            password: formdata.get("password"),
        }

        const payload = await LoginValidator.validate(data);

        const {error:loginErr} = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password,
        });

        if(loginErr) {
            return {
                status: 400,
                error: {email: loginErr.message}
            }
        }

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages);
            return {status: 400, errors: error.messages};
        }
    }

    return redirect("/");
}