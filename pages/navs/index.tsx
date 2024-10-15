import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { History } from "./History";
import { Home } from "./Home";
import { Notification } from "./Notification";
import { Payment } from "./Payment";
import { Profile } from "./Profile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteStackParamList } from "@shared";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";

const Tab = createBottomTabNavigator();
type NavProps = NativeStackScreenProps<RouteStackParamList, "home">;

export function Navs(props: NavProps){
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen 
                name="home" 
                component={Home} 
                options={{
                    tabBarIcon: (props) => <Icon source="home" size={props.size} color={props.color} />,
                }}
            />
            <Tab.Screen 
                name="history" 
                component={History} 
                options={{
                    tabBarIcon: (props) => <Icon source="history" size={props.size} color={props.color} />,
                }}
            />
            <Tab.Screen 
                name="notification" 
                component={Notification} 
                options={{
                    tabBarIcon: (props) => <Icon source="email" size={props.size} color={props.color} />,
                }}
            />
            <Tab.Screen 
                name="payment" 
                component={Payment} 
                options={{
                    tabBarIcon: (props) => <Icon source="home" size={props.size} color={props.color} />,
                }}
            />
            <Tab.Screen 
                name="profile" 
                component={Profile} 
                options={{
                    tabBarIcon: (props) => <Icon source="account" size={props.size} color={props.color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default Navs;