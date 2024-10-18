import { PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { BackHandler, View } from "react-native";
import { Button, Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { getMoney } from "@api";

const successLottie = require("@assets/success_lottie.json");
const failLottie = require("@assets/failed_lottie.json");

const pageName = routeList.transactionFeedback;
type TransactionFeedbackProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function TransactionFeedback(props: TransactionFeedbackProps) {
    const animation = useRef<LottieView>(null);
    // const isSuccess = props.route.params.transaction.finished;
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);
    const [balance, setBalance] = useState<number | null>(null);
    const transaction = props.route.params.transaction;

    useEffect(() => {
        async function fetchMoney(){
            const balance = await getMoney();

            setBalance(balance);
        }

        fetchMoney();
    });

    useEffect(() => {
        animation.current?.reset();
        setTimeout(() => {
            animation.current?.play();
        }, 0)
    }, [])

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
                    <LottieView
                        ref={animation}
                        style={[
                            styles.containerFill,
                        ]}
                        
                        onAnimationFinish={animationFinished ? undefined : (isCanceled) => {
                            console.log(isCanceled);
                            animation.current?.pause();
                            setAnimationFinished(true);
                        }}
                        source={transaction.finished ? successLottie : failLottie}
                    />
                </View>
                <View style={[
                    styles.gap2,
                    styles.flexVertical,
                    styles.alignItemsCenter,
                ]}>
                    <Text>Pembayaran sebesar</Text>
                    <Text variant="titleLarge" style={[styles.fwBold]}>{`Rp. ${transaction.amount.toLocaleString()}`}</Text>
                </View>
                <Text style={[styles.textCenter]}>{transaction.date.toString()}</Text>
                {
                    transaction.finished ? (
                        <Text style={[styles.textCenter]}>Saldo kamu sudah di tarik, sisa saldo kamu sekarang Rp. {balance?.toLocaleString() ?? "-"}</Text>
                    ) : (
                        <Text style={[styles.textCenter]}>Saldo kamu tidak di tarik</Text>
                    )
                }
            </View>
            <View style={[
                styles.py2,
                styles.gap1,
            ]}>
                <Button 
                    mode="contained" 
                    // onPress={() => {animation.current?.play()}}
                    onPress={() => props.navigation.replace(routeList.navs, {screen: "home"})}
                >
                    Kembali ke Beranda
                </Button>
                <Button>
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