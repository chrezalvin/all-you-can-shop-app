import counterConnector from "./counter";
import isDarkConnector from "./isDark";
import transactionConnector from "./transaction";
import moneyConnector from "./money";

export {
    add,
    set,
    reduce,
} from "./counter";

export {
    toggle,
    setDark,
} from "./isDark";

export {
    setMoney,
} from "./money";

export {
    setNewTransaction,
    setTransaction,
} from "./transaction";

export const reducer = {
    isDark: isDarkConnector,
    counter: counterConnector,
    transaction: transactionConnector,
    money: moneyConnector,
}

export default reducer;