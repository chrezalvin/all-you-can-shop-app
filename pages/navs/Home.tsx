import { View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import AppIcon from "@assets/favicon.svg";
import styles from "@styles";
import { IconButton, SquareButton } from "@components";
import { useAppSelector } from "@redux";
import { useNavigation } from "@react-navigation/native";

export function Home(){
    const theme = useTheme();
    const balance = useAppSelector((state) => state.money.amount);

    return (
        <View>
            <View style={[
                styles.flexHorizontal,
                styles.justifyCenter
            ]}>
                <Card
                    style={[
                        {
                            maxWidth: 300
                        },
                        styles.overflowHidden,
                        styles.containerFill,
                    ]}
                >
                    <Card.Title
                        title="Chrealvin"
                        subtitle={`Rp. ${balance?.toLocaleString() ?? "-"}`}
                        titleVariant="titleLarge"
                        subtitleVariant="titleMedium"
                    />
                    <Card.Actions style={[styles.p0]}>
                        <View style={[
                            styles.containerFill,
                            styles.flexHorizontal,
                            styles.justifyEvenly,
                            styles.gap1,
                            styles.m0,
                        ]}>
                            {
                                [1, 2, 3].map((val) => (
                                    <SquareButton>
                                        <AppIcon width={50} height={50} />
                                    </SquareButton>
                                ))
                            }
                        </View>
                    </Card.Actions>
                </Card>
            </View>

            <View style={[
                {
                    maxHeight: 150
                },
                styles.justifyCenter,
                styles.flexHorizontal,
                styles.py5,
                styles.gap3,
            ]}>
                <IconButton label="Pulsa/Data">
                    <Icon source="cellphone" size={48} color={theme.colors.secondary} />
                </IconButton>

                <IconButton label="Listrik">
                    <Icon source="lightning-bolt" size={48} color={theme.colors.secondary} />
                </IconButton>
                
                <IconButton label="BPJS">
                    <Icon source="card-account-details" size={48} color={theme.colors.secondary} />
                </IconButton>
            </View>
        </View>
    );
}

export default Home;