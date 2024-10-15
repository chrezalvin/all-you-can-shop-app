import counterConnector from "./counter";
import isDarkConnector from "./isDark";

export {
    add,
    set,
    reduce,
} from "./counter";

export {
    toggle,
    setDark,
} from "./isDark";

export const reducer = {
    isDark: isDarkConnector,
    counter: counterConnector,
}

export default reducer;