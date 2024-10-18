import { getItem } from "@libs";

export async function getMoney(): Promise<number>{
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const money = await getItem("money");

    if(money === null)
        throw new Error("Money not found");

    return money;
}