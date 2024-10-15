import { PageIndex } from "@libs";
import Home from "./Home";
import Navs from "./navs";
import Splash from "./Splash";

// cant use PageIndex<keyof RouteStackParamList>[] here
export const pagesList: PageIndex<any>[] = [
    Navs,
    Home,
    Splash,
];

export default pagesList;