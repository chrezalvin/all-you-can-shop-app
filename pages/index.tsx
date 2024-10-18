import { PageIndex } from "@libs";
import Home from "./Home";
import Navs from "./navs";
import Splash from "./Splash";
import Confirm from "./Confirm";
import PhoneBuy from "./PhoneBuy";
import ElectricityBuy from "./ElectricityBuy";
import Pin from "./Pin";
import TransactionFeedback from "./TransactionFeedback";

// cant use PageIndex<keyof RouteStackParamList>[] here
export const pagesList: PageIndex<any>[] = [
    Home,
    Navs,
    Splash,
    Confirm,
    PhoneBuy,
    ElectricityBuy,
    Pin,
    TransactionFeedback,
];

export default pagesList;