import styles from "@styles";
import React, { useRef } from "react";
import { InputModeOptions, StyleProp, TextStyle, View, ViewStyle, type TextInput as RNTextInput } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

export interface CustomInputProps{
    label?: string;
    onChangeText?: (val: string) => void;
    inputMode?: InputModeOptions;
    placeholder?: string;
    rightIcon?: string | React.ReactNode;
    leftIcon?: string;
    roundness?: number;
    labelVariant?: VariantProp<never>;
    labelStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
}

export function CustomInput(props: CustomInputProps){
    const ref = useRef<RNTextInput>(null);

    return (
        <View style={[
            styles.flexVertical,
            styles.gap1,
            props.style,
        ]}>
            { 
                props.label && 
                <Text 
                    style={props.labelStyle}
                    variant={props.labelVariant} 
                    onPress={ref.current?.focus}
                >
                    {props.label}
                </Text>
            }
            <TextInput
                ref={ref}
                onChangeText={props.onChangeText}
                inputMode={props.inputMode}
                placeholder={props.placeholder}
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                right={props.rightIcon && typeof props.rightIcon === "string" ? <TextInput.Icon rippleColor="transparent" icon={props.rightIcon}/> : props.rightIcon}
                left={props.leftIcon && <TextInput.Icon rippleColor="transparent" icon={props.leftIcon}/>}
                theme={{
                    roundness: props.roundness ?? styles.rounded2.borderRadius,
                }}
                style={[
                    {
                        height: 50,
                        borderRadius: props.roundness ?? styles.rounded2.borderRadius,
                    },
                    styles.overflowHidden,
                ]}
            />
        </View>
    );
}

export default CustomInput;