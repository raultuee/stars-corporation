import fs from "fs";
import path from "path";

const DB_PATH = path.resolve(__dirname, "transactions.json");

export type Transaction = {
  id: string;
  name: string;
  amount: number;
  type: boolean;
  createdAt: string; // ISO string
};

// Lê todas as transações
export function getTransactions(): Transaction[] {
  if (!fs.existsSync(DB_PATH)) return [];
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data) as Transaction[];
}

// Salva todas as transações
export function saveTransactions(transactions: Transaction[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(transactions, null, 2), "utf-8");
}

// Adiciona uma nova transação
export function addTransaction(transaction: Transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
}