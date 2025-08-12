export type Transaction = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: any;
  id: string;
  name: string;
  amount: number;
  type: boolean;
  createdAt: string; // ISO string
};

const STORAGE_KEY = "sym_transactions";

export function getTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Transaction[];
  } catch {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function addTransaction(transaction: Transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
}

export function deleteTransactions(ids: string[]) {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => !ids.includes(t.id));
  saveTransactions(filtered);
}