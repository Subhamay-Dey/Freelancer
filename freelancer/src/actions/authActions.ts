"use server";

export async function registerAction(formdata:FormData) {
    console.log("The form data is ", formdata);
    
    const data = {
        name: formdata.get("name"),
        username: formdata.get("username"),
        email: formdata.get("email"),
        password: formdata.get("password"),
        Confirm_password: formdata.get("Confirm_password")
    }
}