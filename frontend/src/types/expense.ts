export interface Expense {
    id: number;
    amount: number;
    category: string;
    note?: string;
    date: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ExpenseFormData {
    amount: number;
    category: string;
    note?: string;
    date: string;
  }