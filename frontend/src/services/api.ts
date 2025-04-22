import axios from 'axios';
import { Expense, ExpenseFormData } from '../types/expense';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getAllExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(`${API_URL}/expenses`);
  return response.data;
};

export const getExpenseById = async (id: number): Promise<Expense> => {
  const response = await axios.get(`${API_URL}/expenses/${id}`);
  return response.data;
};

export const createExpense = async (expense: ExpenseFormData): Promise<Expense> => {
  const response = await axios.post(`${API_URL}/expenses`, expense);
  return response.data;
};

export const updateExpense = async (id: number, expense: ExpenseFormData): Promise<Expense> => {
  const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/expenses/${id}`);
};