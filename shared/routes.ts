import { NavigatorScreenParams } from "@react-navigation/native";
import { RouteNavParamList } from "./navRoutes";
import { Transaction, TransactionType } from "@models";

export const routeList = {
    home: "home",
    settings: "settings",
    splash: "splash",
    navs: "navs",
    confirm: "confirm",
    phoneBuy: "phoneBuy",
    electricityBuy: "electricityBuy",
    pin: "pin",
    transactionFeedback: "TransactionFeedback",
    topup: "topup",
    transactionDetail: "transactionDetail",
    bpjs: "bpjs",
} as const;

export type RouteStackParamList = {
    [routeList.home]: undefined;
    [routeList.settings]: undefined;
    [routeList.splash]: undefined;
    [routeList.navs]: NavigatorScreenParams<RouteNavParamList>;
    [routeList.phoneBuy]: undefined;
    [routeList.electricityBuy]: undefined;
    [routeList.topup]: undefined;
    [routeList.bpjs]: undefined;
    [routeList.transactionDetail]: {
        transaction: Transaction;
    };
    [routeList.confirm]: {
        intent: TransactionType;
        id: string;
        targId: string;
    };
    [routeList.pin]: {
        intent: TransactionType;
        id: string;
        targId: string;
    };
    [routeList.transactionFeedback]: {
        transaction: Transaction;
    };
};