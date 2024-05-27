"use server";
import { RegisterValidator } from '@/validations/authSchema';
import vine, { errors } from '@vinejs/vine'

export async function registerAction(formdata:FormData) {
    
    try {
        const data = {
            name: formdata.get("name"),
            username: formdata.get("username"),
            email: formdata.get("email"),
            password: formdata.get("password"),
            Confirm_password: formdata.get("Confirm_password")
        }
        const payload = await RegisterValidator.validate(data);
        console.log("The form data is ", payload);

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
          }
    }
}