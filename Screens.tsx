import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Navs, Splash } from "pages";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { routeList, RouteStackParamList } from "@shared";

export function Screens(){
    const Stack = createNativeStackNavigator<RouteStackParamList>();
    const insets = useSafeAreaInsets();
  
    return (
      <View style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flex: 1,
        },
      ]}>
        <Stack.Navigator initialRouteName={Platform.OS === "web" ? routeList.splash : routeList.navs}>
          <Stack.Screen name={routeList.splash} component={Splash} options={{headerShown: false}} />
          <Stack.Screen name={routeList.home} component={Home} options={{headerShown: false}} />
          <Stack.Screen name={routeList.navs} component={Navs} options={{headerShown: false}} />
        </Stack.Navigator>
      </View>
    );
}

export default Screens;