const telkomselLogo = require("@assets/providerLogo/telkomsel.png");
const indosatLogo = require("@assets/providerLogo/indosat.png");
const xlLogo = require("@assets/providerLogo/xlAxiata.png");
const smartfrenLogo = require("@assets/providerLogo/smartfren.png");

export const phoneProviderLookup = [
    {
        providerName: "telkomsel",
        img: telkomselLogo,
        startNo: ["0811", "0812", "0813", "0821", "0822", "0823", "0852", "0853", "0851"],
    },
    {
        providerName: "indosat",
        img: indosatLogo,
        startNo: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
    },
    {
        providerName: "xl",
        img: xlLogo,
        startNo: ["0817", "0818", "0819", "0859", "0877", "0878"],
    },
    {
        providerName: "smartfren",
        img: smartfrenLogo,
        startNo: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"],
    },
];

export default phoneProviderLookup;