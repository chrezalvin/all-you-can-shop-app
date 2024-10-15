import { getItem, setItem } from "@libs";

import dataPackages from "@assets/data_package.json";
import electricityBills from "@assets/electricity_bills.json";
import {randomUUID} from "crypto";
import pulsa from "@assets/balance.json";

// will only set the money on AsyncStorage
export async function getMoney(): Promise<number>{
    const money = await getItem("money");

    if(money === null)
        throw new Error("Money not found");

    return money;
}

export async function transaction(amount: number, info?: string): Promise<number>{
    const money = await getMoney();
    const lastTransaction = await getItem("transaction");

    if(lastTransaction === null)
        throw new Error("Transaction not found");

    if(money < amount)
        throw new Error("Not enough money");

    await setItem("transaction", [{
        id: randomUUID(),
        date: new Date().toISOString(),
        amount,
        finished: true,
        info: info ?? ""
    } , ...lastTransaction]);
    await setItem("money", money - amount);

    return money - amount;
}

export async function purchasePulsa(phoneNo: string, id: number): Promise<number>{
    const found = pulsa.find((item) => item.id === id);

    if(found === undefined)
        throw new Error("Item not found");

    const money = transaction(found.amount, `Pulsa ${found.amount} for ${phoneNo}`);

    return money;
}

export async function purchaseElectricity(plnId: string, id: number): Promise<number>{
    const found = electricityBills.find((item) => item.id === id);

    if(found === undefined)
        throw new Error("Item not found");

    const money = transaction(found.amount, `Electricity bill ${found.amount} for ${plnId}`);

    return money;
}

export async function purchaseData(phoneNo: string, id: number): Promise<number>{
    const found = dataPackages.find((item) => item.id === id);

    if(found === undefined)
        throw new Error("Item not found");

    const money = transaction(found.amount, `Data package ${found.name} for ${phoneNo}`);

    return money;
}