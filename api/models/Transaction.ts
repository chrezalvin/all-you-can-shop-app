export type TransactionType = "pulsa" | "data" | "electricity" | "topup" | "bpjs";

export interface Transaction{
    id: string;

    // The target id of the transaction (e.g. phone number, electricity id)
    targId?: string;
    date: string;
    amount: number;
    finished: boolean;
    info: string;
    type: TransactionType;
}

export default Transaction;