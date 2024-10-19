import { Pressable, View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import styles from "@styles";
import { IconButton } from "@components";
import { CompositeScreenProps } from "@react-navigation/native";
import { RouteNavParamList } from "../../shared/navRoutes";
import { routeList, RouteStackParamList  } from "../../shared/routes";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { getMoney } from "@api";

type HomeProps = CompositeScreenProps<
    BottomTabScreenProps<RouteNavParamList, "home">,
    NativeStackScreenProps<RouteStackParamList>
>;

export function Home(props: HomeProps){
    const theme = useTheme();
    const [balance, setBalance] = useState<number | null>(null);
    
    useEffect(() => {
        async function fetchMoney(){
            const balance = await getMoney();

            setBalance(balance);
        }

        fetchMoney();
    });


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
                    <Card.Actions style={[styles.py2]}>
                        <View style={[
                            styles.containerFill,
                            styles.flexHorizontal,
                            styles.justifyEvenly,
                            styles.gap1,
                            styles.m0,
                        ]}>
                            <Pressable 
                                onPress={() => {props.navigation.navigate(routeList.topup)}}
                                style={[
                                    styles.containerFill,
                                    styles.alignItemsCenter,
                                    styles.gap1,
                                ]}
                            >
                                <Icon source="arrow-up-bold-circle-outline" size={24} />
                                <Text>Top Up</Text>
                            </Pressable>
                            
                            <Pressable style={[
                                styles.containerFill,
                                styles.alignItemsCenter,
                                styles.gap1,
                            ]}>
                                <Icon source="arrow-down-bold-circle-outline" size={24} />
                                <Text>Tarik Tunai</Text>
                            </Pressable>

                            <Pressable style={[
                                styles.containerFill,
                                styles.alignItemsCenter,
                                styles.gap1,
                            ]}>
                                <Icon source="account-details-outline" size={24} />
                                <Text>More</Text>
                            </Pressable>
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
                
                <IconButton 
                    label="BPJS"
                    onPress={() => {props.navigation.navigate(routeList.bpjs)}}
                >
                    <Icon source="card-account-details" size={48} color={theme.colors.secondary} />
                </IconButton>
            </View>
        </View>
    );
}

export default Home;