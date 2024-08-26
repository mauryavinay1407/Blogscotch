const zod=require("zod");

export const signupSchema= zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
})

export const loginSchema=zod.object({
    email:zod.string(),
    password:zod.string(),
})

export const createBlogSchema=zod.object({
    title:zod.string(),
    content:zod.string(),
    category:zod.string(),
})

