import bpjsList from "@assets/bpjs.json";

export async function getBpjsList(){
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return bpjsList;
}

export async function getBpjs(id: string){
    const topup = bpjsList.find((val) => val.id.toString() === id);

    if(topup === undefined)
        throw new Error("BPJS not found");

    return topup;
}