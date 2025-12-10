import { z } from 'zod'

export const ProductCreateSchema = z.object({
    name: z.string(),
    desc: z.string(),
});