import topupList from "@assets/topup.json";

export async function getTopUpList(){
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return topupList;
}

export async function getTopUp(id: string){
    const topup = topupList.find((val) => val.id.toString() === id);

    if(topup === undefined)
        throw new Error("Topup not found");

    return topup;
}