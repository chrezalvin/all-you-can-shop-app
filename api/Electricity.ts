import Electricity from "@assets/electricity_bills.json";

export interface ElectricityItem{
    id: number;
    amount: number;
}

export async function getElectricityList(): Promise<ElectricityItem[]>{
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return Electricity;
}