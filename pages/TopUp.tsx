import { PriceCard } from "@components";
import { PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { getTopUpList } from "@api";
import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

const pageName = routeList.topup;
type TopUpProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

interface CardItem{
    title: string;
    subtitle?: string;
    amount: number;
    onPress: () => void;
}

function TopUpBody(isLoading: boolean, cardItems: CardItem[] | null = null){
    const theme = useTheme();

    if(isLoading)
        return (
            <View
                style={[
                    styles.containerFill,
                    styles.justifyCenter,
                    styles.alignItemsCenter,
                ]}
            >
                <ActivityIndicator 
                    animating={true}
                    color={theme.colors.primary} 
                    size="large"
                />
            </View>
        );

    return (
        <ScrollView
            contentContainerStyle={[
                styles.gap2,
                styles.px1
            ]}
            style={[
                styles.containerFill,
            ]}
            showsVerticalScrollIndicator={false}
        >
            {
                cardItems?.map((val) => (
                    <PriceCard 
                        key={`topup-${val.amount}`}
                        amount={val.amount}
                        onPress={val.onPress}
                        subtitle={val.subtitle}
                        title={val.title}
                    />
                ))
            }
        </ScrollView>
    );

}

export function TopUp(props: TopUpProps){
    const [isLoading, setIsLoading] = useState(false);
    const [topupList, setTopUpList] = useState<CardItem[] | null>(null);

    async function getData(){
        setIsLoading(true);

        try{
            const topUpLists = await getTopUpList();

            setTopUpList(
                topUpLists.map((val) => {
                    return {
                        amount: val.amount,
                        title: `Rp. ${val.amount.toLocaleString()}`,
                        onPress: () => {props.navigation.navigate(routeList.pin, {id: val.id.toString(), intent: "topup", targId: ""})},
                    }
                })
            );
        }
        catch(e){
            console.error(e);
        }
        finally{
            setIsLoading(false);
        }
    }

    // basic debouncing for 1 second
    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={[
            styles.containerFill,
            styles.gap3
        ]}>
            <View style={[
                styles.flexHorizontal,
                styles.justifyCenter,
                styles.containerFill,
            ]}>
                <View style={[
                    styles.flexVertical,
                    styles.containerFill,
                    styles.gap2,
                    {
                        maxWidth: "90%",
                    },
                ]}>
                    {TopUpBody(isLoading, topupList)}
                </View>
            </View>
        </View>
    );
}

export default {
    name: pageName,
    component: TopUp,
    headerOptions: {
        headerTitle: "Top Up",
        contentStyle: [
            styles.p3,
        ],
    },
} as PageIndex<typeof pageName>;