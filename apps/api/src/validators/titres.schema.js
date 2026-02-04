const { z } = require("zod");

const createTitreSchema = z.object({
  titre: z.string().min(1),
  description: z.string().optional().default(""),
  orderIndex: z.number().int().nonnegative(),
  statut: z.enum(["publié", "brouillon"]).optional().default("publié"),
});

const updateTitreSchema = z.object({
  titre: z.string().min(1).optional(),
  description: z.string().optional(),
  orderIndex: z.number().int().nonnegative().optional(),
  statut: z.enum(["publié", "brouillon"]).optional(),
});

const reorderTitresSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        orderIndex: z.number().int().nonnegative(),
      }),
    )
    .min(1),
});

module.exports = { createTitreSchema, updateTitreSchema, reorderTitresSchema };
