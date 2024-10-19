import { getItem } from "@libs";
import { Transaction } from "@models";

export async function getTransactionHistory(): Promise<Transaction[]>{
    const data = await getItem("transaction");

    if(data === null)
        throw new Error("Transaction not found");

    return data;
}

export async function searchTransactionHistory(id: string): Promise<Transaction | undefined>{
    const data = await getTransactionHistory();

    const transaction = data.find(t => t.id === id);

    return transaction;   
}