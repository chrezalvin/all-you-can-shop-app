import { StyleSheet } from 'react-native';
import colorChoice from '../colors';

export const typography = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colorChoice.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexHorizontal: {
        flexDirection: 'row',
    },
    flexVertical: {
        flexDirection: 'column',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    justifyAround: {
        justifyContent: 'space-around',
    },
    justifyEvenly: {
        justifyContent: 'space-evenly',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    alignItemsEnd: {
        alignItems: 'flex-end',
    },
    alignItemsStretch: {
        alignItems: 'stretch',
    },
    alignItemsBaseline: {
        alignItems: 'baseline',
    },
    w100: {
        width: '100%',
    },
    h100: {
        height: '100%',
    },
    rounded0: {
        borderRadius: 0,
    },
    rounded1: {
        borderRadius: 2,
    },
    rounded2: {
        borderRadius: 4,
    },
    rounded3: {
        borderRadius: 8,
    },
    rounded4: {
        borderRadius: 16,
    },
    roundedCircle: {
        borderRadius: 9999,
    }
});

export default typography;