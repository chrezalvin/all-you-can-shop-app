import { getTransactionHistory } from "@api";
import { CustomInput } from "@components";
import { convertDateToString } from "@libs";
import { Transaction } from "@models";
import styles from "@styles";
import { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { ActivityIndicator, Text, TextInput, useTheme } from "react-native-paper";

const noHistory = require("@assets/no_history_grayscaled.png");

export function HistoryItemCard(transaction: Transaction){
    return (
        <View style={[
            {
                borderBottomWidth: 1,
            },
            styles.pb2,
            styles.containerFill,
            styles.flexVertical,
            styles.gap1,
        ]}>
            <View style={[
                styles.flexHorizontal,
                styles.justifyBetween,
            ]}>
                <Text>{transaction.id}</Text>
                <Text>{convertDateToString(new Date(transaction.date))}</Text>                
            </View>
            <View style={[
                styles.flexHorizontal,
                styles.justifyBetween,
            ]}>
                <Text>Saldo</Text>
                <Text style={[styles.fwBold]}>Rp. {transaction.amount.toLocaleString()}</Text>
            </View>
            <Text style={{
                color: transaction.finished ? "green" : "red",
            }}>
                {transaction.finished ? "Berhasil" : "Gagal"}
            </Text>
        </View>
    );
}

export function History(){
    const [history, setHistory] = useState<Transaction[] | null>();
    const theme = useTheme();

    useEffect(() => {
        async function fetchHistory(){
            const history = await getTransactionHistory();

            setHistory(history);
        }

        fetchHistory();
    }, []);

    function DisplayTransactionHistory({history, isLoading}: {history: Transaction[], isLoading?: boolean}){
        if(isLoading){
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        }

        if(history.length === 0){
            return (
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
            );
        }
        else{
            return (
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.gap2,
                    ]}
                    style={[
                        styles.containerFill,
                        styles.flexVertical,
                        styles.gap2,
                    ]}
                >
                    {history.map((transaction) => (
                        <HistoryItemCard {...transaction} />
                    ))}
                </ScrollView>
            );
        }
    }

    return (
        <View
            style={[
                styles.containerFill,
                styles.justifyCenter,
                styles.flexHorizontal,
            ]}
        >
            <View style={[
                {
                    maxWidth: "90%",
                },
                styles.containerFill,
                styles.flexVertical,
                styles.gap4,
            ]}>
                <CustomInput
                    leftIcon="magnify"
                    placeholder="Cari transaksi"
                />
                <DisplayTransactionHistory
                    history={history ?? []}
                    isLoading={history === null}
                />
            </View>
        </View>
    );
}

export default History;