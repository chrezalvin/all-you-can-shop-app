import { PageIndex } from "@libs";
import { routeList } from "@shared";
import { View } from "react-native";
import { Text } from "react-native-paper";

const pageName = routeList.home;

export function Home() {
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}

export default {
    name: pageName,
    component: Home,
} as PageIndex<typeof pageName>;