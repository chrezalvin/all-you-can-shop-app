import { getDataPackageList, getPulsaList } from "@api";
import { CustomInput, PriceCard } from "@components";
import { decideProvider, isPhoneValid, PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { useEffect, useState } from "react";
import { View, ScrollView, Pressable, Image } from "react-native";
import { ActivityIndicator, Text, TextInput, useTheme } from "react-native-paper";

const pageName = routeList.phoneBuy;
type PhoneBuyProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

interface CardItem{
    title: string;
    subtitle?: string;
    amount: number;
    onPress: () => void;
}

function PhoneBuyBody(phoneNo: string, isLoading: boolean, cardItems: CardItem[] | null = null){
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

    if(!isPhoneValid(phoneNo))
        return (
            <View
                style={[
                    styles.containerFill,
                    styles.justifyCenter,
                    styles.alignItemsCenter,
                ]}
            >
                <Text>Silahkan Masukkan nomor telpon</Text>
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
                        key={`pulsaData-${val.amount}`}
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

export function PhoneBuy(props: PhoneBuyProps){
    const theme = useTheme();
    const [phoneNo, setPhoneNo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isData, setIsData] = useState(false);
    const [pulsaDataList, setPulsaDataList] = useState<CardItem[] | null>(null);

    async function getData(){
        setIsLoading(true);

        try{
            if(isData){
                const listres = await getDataPackageList();
                setPulsaDataList(listres.map(val => {
                        return {
                            title: val.name,
                            subtitle: val.info,
                            amount: val.amount,
                            onPress: () => {props.navigation.navigate("confirm", {intent: "data", id: val.id.toString(), targId: phoneNo})},
                        }
                    }));
            }
            else{
                const listres = await getPulsaList();
                setPulsaDataList(
                    listres.map(val => {
                        return {
                            title: `Rp. ${val.amount.toLocaleString()}`,
                            amount: val.amount,
                            onPress: () => {props.navigation.navigate("confirm", {intent: "pulsa", id: val.id.toString(), targId: phoneNo})},
                        }
                    })
                );
            }
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
    }, [phoneNo]);

    // fetch data whenever the switch change
    useEffect(() => {
        getData();
    }, [isData]);

    const provider = decideProvider(phoneNo);
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
                        label="Nomor Ponsel"
                        placeholder="No. Hp"
                        onChangeText={(val) => {setPhoneNo(val)}}
                        inputMode="numeric"
                        rightIcon={typeof provider === "string" ? provider : <TextInput.Icon rippleColor="transparent" icon={(props) => <Image source={provider?.img ?? "cellphone"} style={{height: props.size, width: props.size, objectFit: "contain"}} />} />}
                    />

                    <View style={[
                        {
                            backgroundColor: theme.colors.elevation.level1,
                            maxHeight: 50,
                        },
                        styles.rounded3,
                        styles.flexHorizontal,
                    ]}>
                        <Pressable 
                            onPress={() => {setIsData(false)}}
                            style={[
                                {
                                    backgroundColor: isData ? undefined: theme.colors.elevation.level4,
                                },
                                styles.containerFill,
                                styles.rounded3,
                                styles.py2,
                            ]}
                        >
                            <Text style={[styles.textCenter]}>Isi Pulsa</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {setIsData(true)}}
                            style={[
                                {
                                    backgroundColor: isData ? theme.colors.elevation.level4: undefined,
                                },
                                styles.containerFill,
                                styles.rounded3,
                                styles.py2,
                            ]}
                        >
                            <Text style={[styles.textCenter]}>Paket Data</Text>
                        </Pressable>
                    </View>

                    {PhoneBuyBody(phoneNo, isLoading, pulsaDataList)}
                </View>
            </View>
        </View>
    );
}

export default {
    name: pageName,
    component: PhoneBuy,
    headerOptions: {
        headerTitle: "Pulsa & Paket Data",
        contentStyle: [
            styles.p3,
        ],
    },
} as PageIndex<typeof pageName>;