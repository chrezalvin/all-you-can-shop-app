export function isPhoneValid(phone: string): boolean{
    return phone.match(/^[0-9]{10,13}$/) !== null;
}