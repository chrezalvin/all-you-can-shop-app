import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { RouteStackParamList, routeList } from "@shared";

type ConfirmProps = NativeStackScreenProps<RouteStackParamList, typeof routeList.confirm>;

// confirmation page with pin
export function Confirm(props: ConfirmProps){
    return (
        <View>
            <Text>{props.route.params.intent}</Text>
        </View>
    );
}

export default Confirm;