import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { History } from "./History";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteNavParamList, RouteStackParamList } from "@shared";
import { Icon } from "react-native-paper";
import AppIcon from "@assets/favicon.svg";
import { PageIndex } from "@libs";
import styles from "@styles";
import { View } from "react-native";

const Tab = createBottomTabNavigator<RouteNavParamList>();
const pageName = routeList.navs;
type NavProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function Navs(props: NavProps){
    return (
        <Tab.Navigator 
            sceneContainerStyle={[styles.p2]} 
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen 
                key="home"
                name="home" 
                component={Home} 
                options={{
                    tabBarIcon: (props) => <Icon source="home" size={props.size} color={props.color} />,
                }}
            />
            <Tab.Screen 
                key="history"
                name="history" 
                component={History} 
                options={{
                    tabBarIcon: (props) => <Icon source="history" size={props.size} color={props.color} />,
                }}
            />
            <Tab.Screen 
                key="profile"
                name="profile" 
                component={Profile} 
                options={{
                    tabBarIcon: (props) => <Icon source="account" size={props.size} color={props.color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export const navScreenOptions: NativeStackNavigationOptions = {
    headerLeft: (props) => (
        <View style={[
            styles.py1,
            styles.px2,
        ]}>
            <AppIcon width={30} height={30} />
        </View>
    ),
    title: "All You Can Shop",
};

const pageAttr: PageIndex<typeof pageName> = {
    name: pageName,
    component: Navs,
    headerOptions: navScreenOptions,
}

export default pageAttr;