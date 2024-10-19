import pulsaList from "@assets/balance.json";

export interface PulsaItem{
    id: number;
    amount: number;
}

export async function getPulsaList(): Promise<PulsaItem[]>{
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return pulsaList;
}

export async function getPulsa(id: string): Promise<PulsaItem>{
        // wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));

    const pulsa = pulsaList.find(pulsa => pulsa.id === parseInt(id));

    if(pulsa === undefined)
        throw new Error("Pulsa not found");

    return pulsa;
}