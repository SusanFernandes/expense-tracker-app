import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get single expense
app.get('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(id),
      },
    });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

// Create expense
app.post('/expenses', async (req, res) => {
  const { amount, category, note, date } = req.body;
  
  try {
    const expense = await prisma.expense.create({
      data: {
        amount: Number(amount),
        category,
        note,
        date: date ? new Date(date) : new Date(),
      },
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Update expense
app.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, category, note, date } = req.body;
  
  try {
    const expense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        amount: Number(amount),
        category,
        note,
        date: date ? new Date(date) : undefined,
      },
    });
    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Delete expense
app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.expense.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});