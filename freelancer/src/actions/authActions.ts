"use server";
import { RegisterValidator } from '@/validations/authSchema';
import { errors } from '@vinejs/vine';
import {createClient} from "@/supabase/supabaseServer";
import { cookies } from 'next/headers';

export async function registerAction(prevState:any, formdata:FormData) {
    
    const supabase = createClient(cookies())

    try {
        const data = {
            name: formdata.get("name"),
            username: formdata.get("username"),
            email: formdata.get("email"),
            password: formdata.get("password"),
            password_confirmation: formdata.get("password_confirmation"),
        }
        const payload = await RegisterValidator.validate(data);
        // console.log("The form data is ", payload);

        // *Check user name if exits

        const {data: userData, error} = await supabase
        .from("users")
        .select("id")
        .eq("username", payload.username)

        console.log("The user data is", userData);
        console.log("The error is", error);
        
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return {status: 400, errors: error.messages};
        }
    }
}