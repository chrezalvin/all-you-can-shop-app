import { getBpjsList } from "@api";
import { CustomInput, PriceCard } from "@components";
import { isBpjsIdValid, PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

const pageName = routeList.bpjs;
type ElectricityBuyProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

interface CardItem{
    title: string;
    subtitle?: string;
    amount: number;
    onPress: () => void;
}

function BpjsBuyBody(targId: string, isLoading: boolean, cardItems: CardItem[] | null = null){
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

    if(!isBpjsIdValid(targId))
        return (
            <View
                style={[
                    styles.containerFill,
                    styles.justifyCenter,
                    styles.alignItemsCenter,
                ]}
            >
                <Text>Silahkan Masukkan nomor pelanggan</Text>
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

export function Bpjs(props: ElectricityBuyProps){
    const [bpjsNo, setBpjsNo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [bpjsList, setBpjsList] = useState<CardItem[] | null>(null);

    async function getData(){
        setIsLoading(true);

        try{
            const bpjsList = await getBpjsList();

            setBpjsList(
                bpjsList.map((val) => {
                    return {
                        amount: val.amount,
                        title: val.name,
                        onPress: () => {props.navigation.navigate(routeList.confirm, {id: val.id.toString(), intent: "bpjs", targId: bpjsNo})},
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
        setIsLoading(true);

        const timer = setTimeout(() => {
            getData();
        }, 1000);

        return () => clearTimeout(timer);
    }, [bpjsNo]);

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
                    <CustomInput 
                        label="ID Pelanggan"
                        placeholder="No. ID Pelanggan"
                        onChangeText={(val) => {setBpjsNo(val)}}
                        inputMode="numeric"
                        rightIcon="lightning-bolt"
                    />

                    {BpjsBuyBody(bpjsNo, isLoading, bpjsList)}
                </View>
            </View>
        </View>
    );
}

export default {
    name: pageName,
    component: Bpjs,
    headerOptions: {
        headerTitle: "BPJS",
        contentStyle: [
            styles.p3,
        ],
    },
} as PageIndex<typeof pageName>;