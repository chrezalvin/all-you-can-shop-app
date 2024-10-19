import { convertDateToString, PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { BackHandler, View } from "react-native";
import { Button, Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { getMoney } from "@api";

import SuccessSvgFinished from "@assets/success_end.svg";
import FailSvgFinished from "@assets/failed_end.svg";

const successLottie = require("@assets/success_lottie.json");
const failLottie = require("@assets/failed_lottie.json");

const pageName = routeList.transactionFeedback;
type TransactionFeedbackProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function TransactionFeedback(props: TransactionFeedbackProps) {
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);
    const [balance, setBalance] = useState<number | null>(null);
    const transaction = props.route.params.transaction;

    function getMessage(): string{
        if(transaction.type === "topup"){
            if(transaction.finished)
                return `Saldo kamu sudah di tambah, saldo kamu sekarang Rp. ${balance?.toLocaleString() ?? "-"}`;
            else
                return "Saldo kamu tidak di tambah";
        }
        else{
            if(transaction.finished)
                return `Saldo kamu sudah di tarik, sisa saldo kamu sekarang Rp. ${balance?.toLocaleString() ?? "-"}`;
            else
                return "Saldo kamu tidak di tarik";
        }
    }

    useEffect(() => {
        async function fetchMoney(){
            const balance = await getMoney();

            setBalance(balance);
        }

        fetchMoney();
    }, []);

    BackHandler.addEventListener("hardwareBackPress", () => {
        props.navigation.replace(routeList.navs, {screen: "home"});

        return true;
    })

    return (
        <View style={[
            styles.containerFill,
            styles.px5,
            styles.py3,
        ]}>
            <View style={[
                styles.containerFill,
                styles.alignItemsCenter,
                styles.justifyCenter,
                styles.flexVertical,
                styles.gap4,
                styles.py2,
            ]}>
                <Text variant="titleLarge" style={[styles.fwBold, styles.textCenter]}>Pembelian {transaction.finished ? "Berhasil!" : "Gagal!"}</Text>
                <View style={{
                    width: 150,
                    height: 150,
                }}>
                    {
                        animationFinished ? (
                            transaction.finished ? <SuccessSvgFinished width={150} height={150} style={[styles.containerFill]} /> : <FailSvgFinished width={150} height={150} style={[styles.containerFill]} />
                        ) : (
                            <LottieView
                                autoPlay={true}
                                loop={false}
                                style={[
                                    styles.containerFill,
                                ]}
                                onAnimationFinish={() => {
                                    setAnimationFinished(true);
                                }}
                                source={transaction.finished ? successLottie : failLottie}
                            />
                        )
                    }
                </View>
                <View style={[
                    styles.gap2,
                    styles.flexVertical,
                    styles.alignItemsCenter,
                ]}>
                    <Text>Pembayaran sebesar</Text>
                    <Text variant="titleLarge" style={[styles.fwBold]}>{`Rp. ${transaction.amount.toLocaleString()}`}</Text>
                </View>
                <Text style={[styles.textCenter]}>{convertDateToString(new Date(transaction.date))}</Text>
                
                <Text style={[styles.textCenter]}>{getMessage()}</Text>
            </View>
            <View style={[
                styles.py2,
                styles.gap1,
            ]}>
                <Button 
                    mode="contained" 
                    onPress={() => props.navigation.replace(routeList.navs, {screen: "home"})}
                >
                    Kembali ke Beranda
                </Button>
                <Button
                    onPress={() => props.navigation.navigate("transactionDetail", {transaction})}
                >
                    Lihat Detail
                </Button>
            </View>
        </View>
    );
}

export default {
    name: pageName,
    component: TransactionFeedback,
} as PageIndex<typeof pageName>;