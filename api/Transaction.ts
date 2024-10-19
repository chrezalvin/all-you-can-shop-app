import { setItem, getItem } from "@libs";
import { TransactionType, Transaction } from "@models";
import { getDataPackage } from "./DataPackage";
import { getElectricity } from "./Electricity";
import { getPulsa } from "./Pulsa";
import uuid from "react-native-uuid";

import dataPackages from "@assets/data_package.json";
import electricityBills from "@assets/electricity_bills.json";
import pulsa from "@assets/balance.json";
import topup from "@assets/topup.json";
import { getTopUp } from "./TopUp";
import { getBpjs } from "./bpjs";

export async function cancelTransaction(): Promise<void>{
    await setItem("attempt", 0);
}

export async function transaction(
    id: string, 
    transactionType: TransactionType,
    password: string,
    targId?: string, 
): Promise<Transaction>{
    const attempt = await getItem("attempt");
    const money = await getItem("money");
    const lastTransaction = await getItem("transaction");

    if(attempt === null || money === null || lastTransaction === null)
        throw new Error("Storage not found, please restart the application");

    if(lastTransaction === null)
        throw new Error("Transaction not found");

    let amount: number;
    let info: string;
    let finished = true;
    switch(transactionType){
        case "pulsa":
            const pulsa = await getPulsa(id);
            amount = pulsa.amount + 1500;
            info = `Rp. ${pulsa.amount.toLocaleString()}`;
            break;
        case "data":
            const dataPackage = await getDataPackage(id);
            amount = dataPackage.amount + 1500;
            info = dataPackage.name;
            break;
        case "electricity":
            const electricity = await getElectricity(id);
            amount = electricity.amount + 1500;
            info = `Rp. ${electricity.amount.toLocaleString()}`;
            break;
        case "topup":
            const topup = await getTopUp(id);
            amount = topup.amount;
            info = `Rp. ${amount.toLocaleString()}`;
            break;
        case "bpjs":
            const bpjs = await getBpjs(id);
            amount = bpjs.amount + 1500;
            info = `Rp. ${amount.toLocaleString()}`;
            break;
        default:
            throw new Error("Transaction type not found");
    }

    if(password != "240901")
    {
        if(attempt < 2){
            await setItem("attempt", attempt + 1);
            throw new Error("Password is incorrect");
        }
        else{
            finished = false;
            await setItem("attempt", 0);
        }
    }

    if(finished){
        if(transactionType === "topup")
            await setItem("money", money + amount);
        else if(money < amount)
            throw new Error("Not enough money");
        else
            await setItem("money", money - amount - 1500);
    }

    const tempTransaction: Transaction = {
        id: uuid.v4().toString(),
        date: new Date().toISOString(),
        type: transactionType,
        finished,
        targId,
        amount,
        info,
    }

    await setItem("transaction", [tempTransaction , ...lastTransaction]);

    return tempTransaction;
}

export async function purchasePulsa(phoneNo: string, id: number, password: string): Promise<Transaction>{
    const found = pulsa.find((item) => item.id === id);

    if(found === undefined)
        throw new Error("Item not found");

    const res = await transaction(id.toString(), "pulsa", password, phoneNo);

    return res;
}

export async function purchaseElectricity(plnId: string, id: number, password: string): Promise<Transaction>{
    const found = electricityBills.find((item) => item.id === id);

    if(found === undefined)
        throw new Error("Item not found");

    const res = await transaction(id.toString(), "electricity", password, plnId);

    return res;
}

export async function purchaseData(phoneNo: string, id: number, password: string): Promise<Transaction>{
    const found = dataPackages.find((item) => item.id === id);

    if(found === undefined)
        throw new Error("Item not found");

    const res = await transaction(id.toString(), "data", password, phoneNo);

    return res;
}

export async function findTransactions(str: string): Promise<Transaction[]>{
    const transactions = await getItem("transaction");

    if(transactions === null)
        throw new Error("Transaction not found");
    return [];

    // return transactions.filter((item) => item.info.includes(str) || 
    //         item.type.toLowerCase().includes(str.toLowerCase()) || 
    //         item.targId?.includes(str)
    // );
}