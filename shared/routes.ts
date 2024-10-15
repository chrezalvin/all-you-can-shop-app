export const routeList = {
    home: "home",
    settings: "settings",
    splash: "splash",
    navs: "navs",
    confirm: "confirm",
} as const;

export type RouteStackParamList = {
    [routeList.home]: undefined;
    [routeList.settings]: undefined;
    [routeList.splash]: undefined;
    [routeList.navs]: undefined;
    [routeList.confirm]: {
        intent: string;
    };
};