import { cancelTransaction, transaction } from "@api";
import { PageIndex } from "@libs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { routeList, RouteStackParamList } from "@shared";
import styles from "@styles";
import { useEffect, useRef, useState } from "react";
import { ColorValue, Keyboard, Pressable, TextInput, View } from "react-native";
import { ActivityIndicator, Icon, IconButton, Text } from "react-native-paper";

const pageName = routeList.pin;
type PinProps = NativeStackScreenProps<RouteStackParamList, typeof pageName>;

export function Circle(props: {size: number, color: ColorValue}) {
    return (
        <View style={[{
            width: props.size,
            height: props.size,
            borderRadius: props.size / 2,
            backgroundColor: props.color,
        }]} />
    )
}

export function Pin(props: PinProps){
    const [pin, setPin] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const ref = useRef<TextInput>(null);

    useEffect(() => {
        ref.current?.focus();

        // reset current attempt when the page is unmounted, will clash with transaction function tho, whatever.
        return () => {
            cancelTransaction();
        }
    }, [])
    
    useEffect(() => {
        const tryTransaction = async () => {
            if(pin.length === 6){
                setIsLoading(true);
    
                try{
                    const res = await transaction(props.route.params.id, props.route.params.intent, pin, props.route.params.targId);

                    props.navigation.replace("TransactionFeedback", {transaction: res});
                }
                catch(e){
                    console.error(e);
                    setIsError(true);
                }
                finally{
                    setIsLoading(false);
                    ref.current?.clear();
                    setPin("");
                }
            }
        }

        tryTransaction();
    }, [pin]);

    return (
        <View style={[
            styles.p5,
            styles.containerFill,
            styles.alignItemsCenter,
            styles.gap2,
        ]}>
            <Text variant="titleLarge" style={[styles.fwBold]}>Masukkan PIN Anda</Text>
            <Text variant="labelLarge">{isError ? "PIN salah, mohon coba lagi" : "Masukkan PIN aplikasi Anda"}</Text>

            <Pressable
                onPress={() => {
                    ref.current?.blur();
                    ref.current?.focus();
                }}
                focusable={false}
                style={[
                    styles.flexHorizontal,
                    styles.gap2,
                    styles.py2,
                ]}
            >
                {
                    Array.from({length: 6}).map((_, i) => (
                        <Circle 
                            key={i}
                            size={40}
                            color={pin.length > i ? "blue" : (isError && pin.length == 0 ? "orange" : "gray")}
                        />
                    ))
                }
            </Pressable>

            <ActivityIndicator 
                animating={isLoading}
                color="blue" 
                size="small"
            />

            <TextInput 
                ref={ref}
                onChangeText={pin.length === 6 ? undefined : setPin}
                inputMode="numeric"
                showSoftInputOnFocus={true}
                value={pin}
                autoFocus={true}
                maxLength={6}
                style={{
                    width: 10,
                    opacity: 0,
                }}
            />
        </View>
    )
}

export default {
    name: pageName,
    component: Pin,
    headerOptions: {
        title: "Verifikasi PIN",
    }
} as PageIndex<typeof pageName>;