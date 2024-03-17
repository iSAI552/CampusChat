import zod from "zod";

const userSignUpZodSchema = zod.object({
    username: zod.string().min(6).max(15),
    email: zod.string().email(),
    password: zod.string().min(8).max(30),
});

const userLoginZodSchema = zod.object({
    username: zod.string().min(6).max(15),
    password: zod.string().min(8).max(30),
})

const emailZodSchema = zod.object({
    email: zod.string().email(),
});

export { userSignUpZodSchema, userLoginZodSchema, emailZodSchema};