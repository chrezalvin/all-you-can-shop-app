import styles from "@styles";
import { Pressable, StyleProp, ViewStyle } from "react-native";

interface SquareButtonProps{
    children?: JSX.Element;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export function SquareButton(props: SquareButtonProps){
    return (
        <Pressable
            onPress={props.onPress}
            style={[
                {
                    aspectRatio: 1,
                    flex: 1,
                },
                styles.justifyCenter,
                styles.alignItemsCenter,
                props.style,
            ]}
        >
            {props.children}
        </Pressable>
    );
}

export default SquareButton;