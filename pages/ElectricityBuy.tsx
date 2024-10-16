import { PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import { View } from "react-native";
import { Text } from "react-native-paper";

const pageName = routeList.electricityBuy;
type ElectricityBuyProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function ElectricityBuy(props: ElectricityBuyProps){
    return (
        <View>
            <Text>Token Listrik</Text>
        </View>
    );
}

export default {
    name: pageName,
    component: ElectricityBuy,
    headerOptions: {}
} as PageIndex<typeof pageName>;