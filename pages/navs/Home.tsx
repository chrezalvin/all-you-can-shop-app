import { View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import AppIcon from "@assets/favicon.svg";
import styles from "@styles";
import { IconButton, SquareButton } from "@components";
import { useAppSelector } from "@redux";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { RouteNavParamList } from "../../shared/navRoutes";
import { routeList, RouteStackParamList  } from "../../shared/routes";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";

type HomeProps = CompositeScreenProps<
    BottomTabScreenProps<RouteNavParamList, "home">,
    NativeStackScreenProps<RouteStackParamList>
>;

export function Home(props: HomeProps){
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
                <IconButton 
                    label="Pulsa/Data"
                    onPress={() => {props.navigation.navigate(routeList.phoneBuy)}}
                >
                    <Icon source="cellphone" size={48} color={theme.colors.secondary} />
                </IconButton>

                <IconButton 
                    label="Listrik"
                    onPress={() => {props.navigation.navigate(routeList.electricityBuy)}}
                >
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