import dataPackages from "@assets/data_package.json";

export interface DataPackageItem{
    id: number;
    name: string;
    info?: string;
    days: number;
    amount: number;
}

export async function getDataPackageList(): Promise<DataPackageItem[]>{
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dataPackages;
}