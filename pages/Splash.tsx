import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import AppIcon from "@assets/favicon.svg";
import { View } from "react-native";
import styles from "@styles";
import { useTheme } from "react-native-paper";
import Animated, {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import { useEffect } from "react";
import { PageIndex } from "@libs";

const pageName = routeList.splash;
type SplashNavProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function Splash(props: SplashNavProps){
    const theme = useTheme();
    const value = useSharedValue(0);

    useEffect(() => {
        value.value = withRepeat(withTiming(1, {duration: 1000}), -1, true);

        // go to home in 3 seconds
        setTimeout(() => {
            props.navigation.replace("navs");
        }, 0);
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(value.value, [0, 1], [theme.colors.elevation.level1, theme.colors.elevation.level2]);
        const size = interpolate(value.value, [0, 1], [40, 50]);

        return {
            backgroundColor,
            padding: size,
        };
    })

    return (
        <View style={[
            {
                flex: 1,
            },
            styles.justifyCenter,
            styles.alignItemsCenter,
        ]}>
            <Animated.View style={[animatedStyle, styles.roundedCircle]}>
                <AppIcon width={124} height={124}/>
            </Animated.View>
        </View>
    );
}

export const options: NativeStackNavigationOptions = {
    
};

export default {
    name: pageName,
    component: Splash,
} as PageIndex<typeof pageName>;