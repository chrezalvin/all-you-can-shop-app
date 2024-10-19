import styles from "@styles";
import { Card, Text } from "react-native-paper";

export interface PriceCardProps{
    title: string;
    subtitle?: string;
    amount: number;
    onPress: () => void;
}

export function PriceCard(props: PriceCardProps){
    return (
        <Card onPress={props.onPress}>
            <Card.Title 
                title={props.title} 
                subtitle={props.subtitle} 
            />
            <Card.Content>
                <Text variant="labelMedium">Harga</Text>
                <Text variant="bodyMedium" style={[styles.fwBold]}>{`Rp. ${props.amount.toLocaleString()}`}</Text>
            </Card.Content>
        </Card>
    );
}

export default PriceCard;