export const navRouteList = {
    home: "home",
    history: "history",
    notification: "notification",
    payment: "payment",
    profile: "profile",
} as const;

export type RouteNavParamList = {
    [navRouteList.home]: undefined;
    [navRouteList.history]: undefined;
    [navRouteList.notification]: undefined;
    [navRouteList.payment]: undefined;
    [navRouteList.profile]: undefined;
};