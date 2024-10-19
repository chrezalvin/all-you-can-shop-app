import styles from "@styles";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export interface IconButtonProps{
    children?: JSX.Element;
    label?: string;
    onPress?: () => void;
}

export function IconButton(props: IconButtonProps){
    const theme = useTheme();

    return (
        <Pressable 
            onPress={props.onPress}
            style={[
                styles.flexVertical,
                styles.justifyCenter,
                styles.alignItemsCenter,
                styles.gap2,
            ]}>
            <View style={[
                {
                    backgroundColor: theme.colors.background,
                    aspectRatio: 1,
                    shadowColor: theme.colors.elevation.level4,
                    shadowRadius: 20,
                },
                styles.p3,
                styles.rounded4,
            ]}>
                {props.children}
            </View>
            {props.label && <Text>{props.label}</Text>}
        </Pressable>
    )
}

export default IconButton;