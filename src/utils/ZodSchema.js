import zod from "zod";

const zodSchema = zod.object({
    username: zod.string().min(3).max(30),
    email: zod.string().email(),
    password: zod.string().min(8).max(30),
});

export { zodSchema };