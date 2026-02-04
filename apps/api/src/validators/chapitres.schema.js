const { z } = require("zod");

const createChapitreSchema = z.object({
  titreId: z.string().min(1),
  numero: z.string().min(1),
  intitule: z.string().min(1),
  description: z.string().optional().default(""),
  orderIndex: z.number().int().nonnegative(),
  statut: z.enum(["publié", "brouillon"]).optional().default("publié"),
});

const updateChapitreSchema = z.object({
  titreId: z.string().min(1).optional(),
  numero: z.string().min(1).optional(),
  intitule: z.string().min(1).optional(),
  description: z.string().optional(),
  orderIndex: z.number().int().nonnegative().optional(),
  statut: z.enum(["publié", "brouillon"]).optional(),
});

const reorderChapitresSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        orderIndex: z.number().int().nonnegative(),
      }),
    )
    .min(1),
});

module.exports = {
  createChapitreSchema,
  updateChapitreSchema,
  reorderChapitresSchema,
};
