import { NavigatorScreenParams } from "@react-navigation/native";
import { RouteNavParamList } from "./navRoutes";
import { transaction } from "@api";
import { Transaction } from "@models";

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
} as const;

export type RouteStackParamList = {
    [routeList.home]: undefined;
    [routeList.settings]: undefined;
    [routeList.splash]: undefined;
    [routeList.navs]: NavigatorScreenParams<RouteNavParamList>;
    [routeList.phoneBuy]: undefined;
    [routeList.electricityBuy]: undefined;
    [routeList.confirm]: {
        intent: "pulsa" | "data" | "electricity";
        id: string;
        targId: string;
    };
    [routeList.pin]: {
        intent: "pulsa" | "data" | "electricity";
        id: string;
        targId: string;
    };
    [routeList.transactionFeedback]: {
        transaction: Transaction;
    };
};