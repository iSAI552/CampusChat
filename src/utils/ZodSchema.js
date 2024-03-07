import zod from "zod";

const userSignUpZodSchema = zod.object({
    username: zod.string().length(8),
    email: zod.string().email(),
    password: zod.string().min(8).max(30),
});

const userLoginZodSchema = zod.object({
    username: zod.string().length(8),
    password: zod.string().min(8).max(30),
})

export { userSignUpZodSchema, userLoginZodSchema};