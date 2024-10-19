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

export async function getDataPackage(id: string): Promise<DataPackageItem>{
        // wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));

    const dataPackage = dataPackages.find(dataPackage => dataPackage.id === parseInt(id));

    if(dataPackage === undefined)
        throw new Error("Data package not found");

    return dataPackage;
}