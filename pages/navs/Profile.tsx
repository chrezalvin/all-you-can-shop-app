import { toggle, useAppDispatch, useAppSelector } from "@redux";
import styles from "@styles";
import { View, Image } from "react-native";
import { Switch, Text } from "react-native-paper";

const myPhoto = require("@assets/myPicture.png");

export function Profile(){
    const isDark = useAppSelector((state) => state.isDark.isDark);
    const dispatch = useAppDispatch();

    return (
        <View style={[styles.gap2, styles.containerFill]}>
            <Text variant="titleMedium" style={[styles.fwBold, styles.textCenter]}>Profile</Text>
            <View style={[
                styles.flexHorizontal,
                styles.justifyCenter,
            ]}>
                <Image
                    style={[
                        {
                            width: 150,
                            height: 150,
                        },
                        styles.roundedCircle,
                    ]}
                    source={myPhoto}
                />
            </View>
            <View style={[styles.justifyCenter, styles.alignItemsCenter]}>
                <Text style={[styles.fwBold]} variant="titleMedium">Chrealvin</Text>
                <Text style={[styles.fwBold]} variant="titleSmall">00000045606</Text>
                <Text variant="labelMedium">(24 September 2001)</Text>
            </View>
            <View style={[styles.flexHorizontal, styles.justifyCenter]}>
                <View style={[
                    {
                        maxWidth: 300
                    },
                    styles.flexHorizontal,
                    styles.justifyBetween,
                    styles.containerFill,
                ]}>
                    <Text variant="labelMedium">Dark Mode</Text>
                    <Switch value={isDark} onValueChange={() => {dispatch(toggle())}} />
                </View>
            </View>
            <View
                style={[
                    {
                        flexGrow: 1,
                    },
                    styles.containerFill,
                    styles.justifyEnd,
                ]}
            >
                <Text 
                    variant="labelMedium" 
                    style={[styles.textCenter]}
                >
                    Version 1.0.0 - (15.10.2024)
                </Text>
            </View>
        </View>
    );
}

export default Profile;