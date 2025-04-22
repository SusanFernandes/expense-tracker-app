import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Sample data
  const sampleExpenses = [
    {
      amount: 25.99,
      category: 'Food',
      note: 'Lunch with colleagues',
      date: new Date('2023-12-01'),
    },
    {
      amount: 45.50,
      category: 'Transportation',
      note: 'Uber ride',
      date: new Date('2023-12-02'),
    },
    {
      amount: 12.00,
      category: 'Entertainment',
      note: 'Movie ticket',
      date: new Date('2023-12-03'),
    },
  ];

  // Insert sample data
  for (const expense of sampleExpenses) {
    await prisma.expense.create({
      data: expense,
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });