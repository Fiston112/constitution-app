const { z } = require("zod");

const createArticleSchema = z.object({
  chapitreId: z.string().min(1),
  numero: z.string().min(1),
  contenu: z.string().min(1),
  notes: z.string().optional().default(""),
  orderIndex: z.number().int().nonnegative(),
  statut: z.enum(["publié", "brouillon"]).optional().default("publié"),
});

const updateArticleSchema = z.object({
  chapitreId: z.string().min(1).optional(),
  numero: z.string().min(1).optional(),
  contenu: z.string().min(1).optional(),
  notes: z.string().optional(),
  orderIndex: z.number().int().nonnegative().optional(),
  statut: z.enum(["publié", "brouillon"]).optional(),
});

const reorderArticlesSchema = z.object({
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
  createArticleSchema,
  updateArticleSchema,
  reorderArticlesSchema,
};
