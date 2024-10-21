import { setLanguageById, toggle, useAppDispatch, useAppSelector } from "@redux";
import styles from "@styles";
import { View, Image, Pressable } from "react-native";
import { Icon, Switch, Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import languageList from "@assets/languages.json";

const myPhoto = require("@assets/myPicture.png");

export function Profile(){
    const isDark = useAppSelector((state) => state.isDark.isDark);
    const language = useAppSelector((state) => state.language.language);
    const dispatch = useAppDispatch();

    return (
        <View style={[styles.gap2, styles.containerFill]}>
            <Text variant="titleMedium" style={[styles.fwBold, styles.textCenter]}>Profile</Text>
            <View style={[
                styles.flexHorizontal,
                styles.justifyCenter,
            ]}>
                <Image
                    style={[
                        {
                            width: 150,
                            height: 150,
                        },
                        styles.roundedCircle,
                    ]}
                    source={myPhoto}
                />
            </View>
            <View style={[styles.justifyCenter, styles.alignItemsCenter]}>
                <Text style={[styles.fwBold]} variant="titleMedium">Chrealvin</Text>
                <Text style={[styles.fwBold]} variant="titleSmall">00000045606</Text>
                <Text variant="labelMedium">(24 September 2001)</Text>
            </View>
            <View style={[
                styles.flexVertical, 
                styles.alignItemsCenter,
            ]}>
                <View style={[
                    styles.flexVertical,
                    styles.gap0,
                    {
                        width: "100%",
                        maxWidth: 300,
                    }
                ]}>
                    <View style={[
                        styles.flexHorizontal,
                        styles.justifyBetween,
                        styles.py3,
                        {
                            height: 50,
                        }
                    ]}>
                        <Text variant="labelLarge">Dark Mode</Text>
                        <Switch value={isDark} onValueChange={() => {dispatch(toggle())}} />
                    </View>
                    <View style={[
                        styles.flexHorizontal,
                        styles.justifyBetween,
                        styles.py3,
                    ]}>
                        <Text variant="labelLarge">Language</Text>
                        <View style={{
                            width: 70,
                        }}>
                            <Dropdown
                                mode="flat"
                                statusBarHeight={50}
                                maxMenuHeight={100}
                                hideMenuHeader={true}
                                CustomDropdownInput={(props) => (
                                    <View style={[
                                        styles.flexHorizontal,
                                        styles.justifyBetween,
                                    ]}>
                                        <Text style={{
                                            textAlignVertical: "center",
                                            textAlign: "center",
                                            flex: 1,
                                        }}>{props.selectedLabel}</Text>
                                        <Icon source="chevron-down" size={24} />
                                    </View>
                                )}
                                onSelect={(val) => {dispatch(setLanguageById(val ?? ""))}}
                                CustomDropdownItem={(props) => (
                                    <Pressable 
                                        onPress={() => {
                                            props.toggleMenu(); 
                                            props.onSelect?.(props.option.value)
                                        }}
                                        style={[
                                            styles.p2,
                                        ]}
                                    >
                                        <Text>{props.option.label}</Text>
                                    </Pressable>
                                )}
                                
                                options={languageList.map((lang) => {
                                    return {
                                        value: lang.id,
                                        label: lang.shortName,
                                    };
                                })}
                                value={language.id}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={[
                    {
                        flexGrow: 1,
                    },
                    styles.containerFill,
                    styles.justifyEnd,
                ]}
            >
                <Text 
                    variant="labelMedium" 
                    style={[styles.textCenter, styles.fwBold]}
                >
                    Version 1.0.0 - (15.10.2024)
                </Text>
            </View>
        </View>
    );
}

export default Profile;