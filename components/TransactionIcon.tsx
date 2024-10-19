import { decideProvider } from "@libs";
import { Transaction } from "@models";
import { Image } from "react-native";
import { Icon } from "react-native-paper";

export interface TransactionIconProps{
    transaction: Transaction;
    size: number;
}

export function TransactionIcon(props: TransactionIconProps){
    let icon: string;

    switch(props.transaction.type){
        case "pulsa":
        case "data":
            const provider = decideProvider(props.transaction.targId ?? "");
            
            if(provider === null)
                icon = "cellphone";
            else
                return (
                    <Image
                        source={provider?.img}
                        style={{
                            width: props.size,
                            height: props.size,
                        }}
                    />
                )
            break;

        case "electricity":
            icon = "lightning-bolt";
            break;

        case "topup":
            icon = "cash";
            break;

        case "bpjs":
            icon = "shield";
            break;

        default:
            icon = "checkbox-blank-circle";
    }

    return (
        <Icon
            source={icon}
            size={props.size}
        />
    );
}

export default TransactionIcon;