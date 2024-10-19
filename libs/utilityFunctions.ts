import { phoneProviderLookup } from "@shared";

export function isPhoneValid(phone: string): boolean{
    return phone.match(/^[0-9]{10,13}$/) !== null;
}

export function isElectricityIdValid(id: string): boolean{
    // max 12 digits
    // starts with no zero
    return id.match(/^[1-9][0-9]{9,11}$/) !== null;
}

export function isBpjsIdValid(id: string): boolean{
    // 13 digits 0 at the start
    return id.match(/^0[0-9]{12}$/) !== null;
}

export function decideProvider(phoneNo: string){
    const provider = phoneProviderLookup.find(val => val.startNo.some(start => phoneNo.startsWith(start)));
    return provider;
}

/**
 * turns date into string form with format DD MMM YYY, HH:MM
 * ex: 20 Des 2023, 09:42
 * @param date the date to be converted
 * @returns the formatted string
 */
export function convertDateToString(date: Date){
    const monthLookup = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const day = date.getDate();
    const month = monthLookup[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day} ${month} ${year}, ${hour < 10 ? `0${hour}`: hour}:${minute < 10 ? `0${minute}`: minute}`;
}