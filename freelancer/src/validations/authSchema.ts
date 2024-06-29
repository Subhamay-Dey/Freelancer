import vine from '@vinejs/vine';
import { CustomErrorReporter } from './CustomErrorReporter';

vine.errorReporter = () => new CustomErrorReporter();

const registerSchema = vine.object({
    name: vine.string().minLength(5).maxLength(50),
    username: vine.string().minLength(5).maxLength(20),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(32).confirmed(),
})

export const RegisterValidator = vine.compile(registerSchema)

const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string(),
})

export const LoginValidator = vine.compile(loginSchema)
