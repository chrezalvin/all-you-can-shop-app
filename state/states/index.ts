import counterConnector from "./counter";
import isDarkConnector from "./isDark";
import transactionConnector from "./transaction";
import moneyConnector from "./money";
import attemptConnector from "./attempt";

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

export {
    addAttempt,
    resetAttempt,
} from "./attempt";

export const reducer = {
    isDark: isDarkConnector,
    counter: counterConnector,
    transaction: transactionConnector,
    money: moneyConnector,
    attempt: attemptConnector,
}

export default reducer;