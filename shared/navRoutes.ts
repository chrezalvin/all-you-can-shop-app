export const navRouteList = {
    home: "home",
    history: "history",
    profile: "profile",
} as const;

export type RouteNavParamList = {
    [navRouteList.home]: undefined;
    [navRouteList.history]: undefined;
    [navRouteList.profile]: undefined;
};