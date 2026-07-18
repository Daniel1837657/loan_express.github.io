import { z } from "zod";

export const solicitudSchema = z.object({
  productId: z.string().nonempty(),
  amount: z.number().int().min(3000).max(200000),
  term: z.number().int().refine((value) => [12, 24, 36, 48, 60].includes(value), {
    message: "Plazo no valido"
  }),
  clientNotes: z.string().optional(),
  documents: z.array(
    z.object({
      type: z.string().nonempty(),
      name: z.string().nonempty(),
      size: z.number().int().max(10 * 1024 * 1024),
      mime: z.string().nonempty()
    })
  )
});
