import { PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import { View } from "react-native";
import { Text } from "react-native-paper";

const pageName = routeList.phoneBuy;
type PhoneBuyProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function PhoneBuy(props: PhoneBuyProps){
    return (
        <View>
            <Text>Pulsa & Paket Data</Text>
        </View>
    );
}

export default {
    name: pageName,
    component: PhoneBuy,
} as PageIndex<typeof pageName>;