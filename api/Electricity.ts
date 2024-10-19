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

export async function getElectricity(id: string): Promise<ElectricityItem>{
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const electricity = Electricity.find(electricity => electricity.id === parseInt(id));

    if(electricity === undefined)
        throw new Error("Electricity not found");

    return electricity;
}