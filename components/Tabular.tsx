import styles from "@styles";
import { StyleProp, View, ViewStyle } from "react-native";

export interface RowItem{
    left: JSX.Element;
    right: JSX.Element;
}

export interface TabularProps{
    rows: RowItem[];
    style: StyleProp<ViewStyle>;
}

export function Tabular(props: TabularProps){
    return (
        <View style={props.style}>
            {
                props.rows.map(({left, right}) => (
                    <View style={[
                        styles.justifyAround,
                        styles.flexHorizontal,
                        styles.alignItemsCenter,
                    ]}>
                        {left}
                        {right}
                    </View>
                ))
            }
        </View>
    );
}

export default Tabular;