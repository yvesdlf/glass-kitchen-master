import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Example: Get all recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: { ingredients: true }
  });
  res.json(recipes);
});

// Example: Add a recipe
app.post('/api/recipes', async (req, res) => {
  const { name, description, course, cuisine, portionSize, prepTime, cookTime, category, ingredients } = req.body;
  const recipe = await prisma.recipe.create({
    data: {
      name,
      description,
      course,
      cuisine,
      portionSize,
      prepTime,
      cookTime,
      category,
      ingredients: {
        create: ingredients
      }
    },
    include: { ingredients: true }
  });
  res.json(recipe);
});

// Example: Get all suppliers
app.get('/api/suppliers', async (req, res) => {
  const suppliers = await prisma.supplier.findMany();
  res.json(suppliers);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
