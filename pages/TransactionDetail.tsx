import { TransactionIcon } from "@components";
import { PageIndex, convertDateToString } from "@libs";
import { Transaction } from "@models";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const pageName = routeList.transactionDetail;
type PinProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

interface TableRowProps{
    left: string;
    right: string;
}

function TableRow(props: TableRowProps){
    return (
        <View style={[
            styles.justifyAround,
            styles.flexHorizontal,
            styles.alignItemsCenter,
        ]}>
            <Text style={[styles.containerFill, styles.textLeft]}>{props.left}</Text>
            <Text style={[styles.containerFill, styles.textRight]}>{props.right}</Text>
        </View>
    )
}

export function TransactionDetail(props: PinProps){

    const transaction: Transaction = props.route.params.transaction;
    return (
        <View style={[
            styles.containerFill,
            styles.p5,
        ]}>
            <View style={[
                styles.containerFill,
                styles.gap2,
            ]}>
                <View
                    style={[
                        styles.flexHorizontal,
                        styles.justifyCenter,
                    ]}
                >
                    <TransactionIcon 
                        transaction={transaction} 
                        size={48} 
                    />
                </View>
                <Text>Detail Transaksi</Text>

                <TableRow left="JENIS TRANSAKSI" right={transaction.type.toUpperCase()} />
                {transaction.targId && <TableRow left="No" right={transaction.targId} />}
                <TableRow left="TANGGAL" right={convertDateToString(new Date(transaction.date))} />
                <TableRow left="HARGA" right={`Rp. ${transaction.amount.toLocaleString()}`} />
                <TableRow left="STATUS" right={transaction.finished ? "Selesai" : "Gagal"} />
            </View>
            <View style={[
                styles.absolute,
                styles.bottom0,
                styles.left0,
                styles.right0,
                styles.mb3,
                styles.px4,
            ]}>
                <Button mode="contained" onPress={() => {props.navigation.goBack()}}>
                    Kembali
                </Button>
            </View>
        </View>
    )
}

export default {
    name: pageName,
    component: TransactionDetail,
    headerOptions: {
        title: "Bukti Transaksi"
    }
} as PageIndex<typeof pageName>;