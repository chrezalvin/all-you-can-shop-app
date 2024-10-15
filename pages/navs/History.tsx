import styles from "@styles";
import { View, Image } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

const noHistory = require("@assets/no_history_grayscaled.png");

export function History(){
    const theme = useTheme();

    return (
        <View
            style={[
                styles.containerFill,
                styles.gap2,
            ]}
        >
            <Text 
                variant="titleMedium" 
                style={[styles.fwBold, styles.textCenter]}
            >History</Text>

            <View
                style={[
                    styles.flexHorizontal,
                    styles.justifyCenter,
                ]}
            >
                <TextInput
                    left={<TextInput.Icon size={25} rippleColor="transparent" icon="magnify" />}
                    placeholder="Cari transaksi"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={[
                        {
                            maxWidth: 400,
                            height: 40,
                        },
                        styles.containerFill,
                        styles.p0,
                        styles.rounded4
                    ]}
                />
            </View>
            <View style={[
                styles.containerFill,
                styles.flexVertical,
                styles.justifyCenter,
                styles.alignItemsCenter,
                styles.gap2,
            ]}>
                <View
                    style={[
                        {
                            padding: 40,
                            backgroundColor: theme.colors.elevation.level3,
                        },
                        styles.roundedCircle,
                    ]}
                >
                    <Image
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={noHistory}
                        width={100}
                        height={100}
                    />
                </View>
                <Text style={[
                    {
                        color: theme.colors.secondary,
                    },
                    styles.fwBold,
                    styles.textCenter
                ]}>Belum ada transaksi</Text>
            </View>
        </View>
    );
}

export default History;