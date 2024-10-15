import { NavigatorScreenParams } from "@react-navigation/native";
import { RouteNavParamList } from "./navRoutes";

export const routeList = {
    home: "home",
    settings: "settings",
    splash: "splash",
    navs: "navs",
    confirm: "confirm",
    phoneBuy: "phoneBuy",
    electricityBuy: "electricityBuy",
} as const;

export type RouteStackParamList = {
    [routeList.home]: undefined;
    [routeList.settings]: undefined;
    [routeList.splash]: undefined;
    [routeList.navs]: NavigatorScreenParams<RouteNavParamList>;
    [routeList.confirm]: {
        intent: string;
    };
    [routeList.phoneBuy]: undefined;
    [routeList.electricityBuy]: undefined;
};