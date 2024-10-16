import { PageIndex } from "@libs";
import Home from "./Home";
import Navs from "./navs";
import Splash from "./Splash";
import Confirm from "./Confirm";
import PhoneBuy from "./PhoneBuy";
import ElectricityBuy from "./ElectricityBuy";

// cant use PageIndex<keyof RouteStackParamList>[] here
export const pagesList: PageIndex<any>[] = [
    Home,
    Navs,
    Splash,
    Confirm,
    PhoneBuy,
    ElectricityBuy,
];

export default pagesList;