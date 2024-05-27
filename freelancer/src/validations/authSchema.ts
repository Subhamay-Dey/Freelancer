import vine from '@vinejs/vine'

const registerSchema = vine.object({
    name: vine.string().minLength(5).maxLength(50),
    username: vine.string().minLength(5).maxLength(20),
    email: vine.string().email(),
    password: vine
        .string()
        .minLength(6)
        .maxLength(32)
        .confirmed()
})

const RegisterValidator = vine.compile(registerSchema)
