import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, ScrollView, Image } from "react-native";
import { ActivityIndicator, Button, Card, Icon, Text, useTheme } from "react-native-paper";
import { RouteStackParamList, routeList } from "@shared";
import { decideProvider, PageIndex } from "@libs";
import styles from "@styles";
import { TransactionType } from "@models";
import { useEffect, useState } from "react";
import { getBpjs, getDataPackage, getElectricity, getMoney, getPulsa } from "@api";
import { getTopUp } from "api/TopUp";

type ConfirmProps = NativeStackScreenProps<RouteStackParamList, typeof routeList.confirm>;

interface CardConfirmProps{
    targId: string;
    type: TransactionType;
    amount: number;
}

function CardConfirm({targId, type, amount}: CardConfirmProps){
    let typeName: string;
    let icon: string | Object;

    switch(type){
        case "pulsa":
        case "data":
            const provider = decideProvider(targId);
            typeName = provider?.providerName ?? "unknown";
            icon = provider?.img ?? "cellphone";
            break;
        case "electricity":
            typeName = "Listrik";
            icon = "lightning-bolt";
            break;
        case "topup": 
            typeName = "Top Up";
            icon = "cash";
            break;
        case "bpjs":
            typeName = "BPJS";
            icon = "shield";
            break;
    }

    return (
        <Card
            elevation={2}
        >
            <Card.Content style={[
                styles.flexHorizontal,
                styles.gap3,
                styles.alignItemsCenter,
            ]}>
                {typeof icon === "string" ? <Icon source={"lightning-bolt"} size={36}/> : <Image source={icon} style={{width: 36, height: 36, objectFit: "contain"}}/>}
                <View style={[
                    styles.gap1,
                    styles.containerFill,
                ]}>
                    <Text style={[styles.fwBold]}>{typeName}</Text>
                    <Text>{targId}</Text>
                </View>
                <View>
                    <Text>{`Rp. ${amount.toLocaleString()}`}</Text>
                </View>
            </Card.Content>
        </Card>
    );
}

// confirmation page with pin
export function Confirm(props: ConfirmProps){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [productName, setProductName] = useState<string>("");
    const [balance, setBalance] = useState<number | null>();
    const theme = useTheme();


    const isBalanceEnough = balance && balance >= price;
    useEffect(() => {
        async function fetchData(id: string, type: TransactionType){
            setIsLoading(true);
            
            setBalance(await getMoney());
            try{
                switch(type){
                    case "pulsa":{
                        const res = await getPulsa(id);
                        setPrice(res.amount);
                        setProductName(`Rp. ${res.amount.toLocaleString()}`);
                        break;
                    }
                    case "data":{
                        const res = await getDataPackage(id);
                        setPrice(res.amount);
                        setProductName(res.name);
                        break;
                    }
                    case "electricity":{
                        const res = await getElectricity(id);
                        setPrice(res.amount);
                        setProductName(`Rp. ${res.amount.toLocaleString()}`);
                        break;
                    }
                    case "topup": {
                        const res = await getTopUp(id);
                        setPrice(res.amount);
                        setProductName(`Rp. ${parseInt(id).toLocaleString()}`);
                        break;
                    }
                    case "bpjs": {
                        const res = await getBpjs(id);
                        setPrice(res.amount);
                        setProductName(`Rp. ${res.amount.toLocaleString()}`);
                        break;
                    }
                }
            }
            catch(e){
                console.error(e);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchData(props.route.params.id, props.route.params.intent);
    }, []);

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={[
                {
                    backgroundColor: theme.colors.elevation.level1
                },
                styles.px5,
                styles.py2,
            ]}>
                <CardConfirm 
                    targId={props.route.params.targId}
                    type={props.route.params.intent}
                    amount={price}
                />
            </View>

            <ScrollView style={[
                styles.containerFill,
                styles.py3,
            ]}>
                <View style={[
                    {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.elevation.level1,
                    },
                    styles.py2,
                    styles.px5,
                    styles.gap2,
                ]}>
                    <Text variant="labelLarge" style={[styles.fwBold]}>Metode Pembayaran</Text>
                    <View style={[
                        styles.flexHorizontal,
                        styles.gap3,
                        styles.alignItemsCenter,
                    ]}>
                        <Icon source="cash" size={36}/>
                        <View style={[
                            styles.gap1,
                            styles.containerFill,
                        ]}>
                            <Text style={[styles.fwBold]}>Saldo</Text>
                            <Text style={{
                                color: isLoading || isBalanceEnough ? undefined : theme.colors.error,
                            }} >Rp. {balance?.toLocaleString() ?? "-"}</Text>
                        </View>
                        <View>
                            <Button>Ubah</Button>
                        </View>
                    </View>
                </View>

                <View style={[
                    styles.px5,
                    styles.py4,
                    styles.gap3,
                ]}>
                    <View style={[
                        {
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.elevation.level1,
                        },
                        styles.pb3,
                        styles.gap3,
                    ]}>
                        <Text variant="labelLarge" style={[styles.fwBold]}>Detail Pembayaran</Text>
                        <View style={[
                            styles.gap2,
                        ]}>
                            <View style={[
                                styles.flexHorizontal,
                                styles.justifyBetween,
                            ]}>
                                <Text>{productName}</Text>
                                <Text>{`Rp. ${price.toLocaleString()}`}</Text>
                            </View>
                            <View style={[
                                styles.flexHorizontal,
                                styles.justifyBetween,
                            ]}>
                                <Text>Biaya Transaksi</Text>
                                <Text>Rp. 1,500</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={[
                            styles.flexHorizontal,
                            styles.justifyBetween,
                        ]}>
                            <Text>Total Pembayaran</Text>
                            <Text>{`Rp. ${(price + 1500).toLocaleString()}`}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[
                styles.absolute,
                styles.bottom0,
                styles.left0,
                styles.right0,
                styles.mb3,
                styles.px5,
            ]}>
                <Button
                    mode="contained"
                    onPress={isLoading ? undefined : () => {props.navigation.navigate("pin", {...props.route.params})}}
                    disabled={isLoading || !isBalanceEnough}
                >
                    {
                        isLoading ? <ActivityIndicator size={20} color={theme.colors.background} /> : "Konfirmasi"
                    }
                </Button>
            </View>
        </View>
    );
}

export default {
    name: routeList.confirm,
    component: Confirm,
    headerOptions: {
        title: "Konfirmasi Pembayaran"
    }
} as PageIndex<typeof routeList.confirm>;