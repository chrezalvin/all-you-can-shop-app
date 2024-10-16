import { View, Text, StyleProp, ViewStyle } from "react-native";
import styles from "../styles";

interface GridViewProps{
    rowCount: number;
    gap: number;
    childrens: JSX.Element[];
    gridStyle?: StyleProp<ViewStyle>;
}

export function GridView(props: GridViewProps){
    const ui2 = (new Array(Math.ceil(props.childrens.length / props.rowCount)).fill(0))
        .map((_, index) => (
            <View style={[{
                    flex: 1,
                    gap: props.gap,
                },
                styles.flexHorizontal,
                props.gridStyle,
            ]}>
                {
                    props
                        .childrens
                        .slice(index * props.rowCount, (index + 1) * props.rowCount)
                        .map(child => (
                            <View style={[
                                {
                                    flex: props.rowCount
                                },
                                styles.flexVertical,
                            ]}>
                                {child}
                            </View>
                        ))
                }
            </View>
        ));

    const ui = props.childrens.map((child, index) => (
        <View style={[{
            flex: props.rowCount
            },
            styles.flexHorizontal
        ]}>
            {
                props.childrens
            }
        </View>
    ));

    return (
        <View style={[
            { 
                flexDirection: "column",
                flex: 1,
                gap: props.gap
            }
        ]}>
            {ui2}
        </View>
    );
}

export default GridView;