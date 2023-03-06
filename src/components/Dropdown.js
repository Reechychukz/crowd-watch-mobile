import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';

import {
    Colors,
    StyledInputLabel,
    LeftIcon
} from "../components/style";

//Colors
const { brand, secondary } = Colors;

const DropdownComponent = () => {

    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [stateName, setStateName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://geo-info.herokuapp.com/v1/countries'
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                var count = Object.keys(response.data).length;
                let countryArray = [];

                for (let i = 0; i < count; i++) {
                    countryArray.push({
                        value: response.data[i].short,
                        label: response.data[i].name
                    })
                }
                setCountryData(countryArray);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleState = (countryCode) => {
        var config = {
            method: 'get',
            url: `https://geo-info.herokuapp.com/v1/countries/${countryCode}/states/`
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                var count = Object.keys(response.data).length;
                let stateArray = [];

                for (let i = 0; i < count; i++) {
                    stateArray.push({
                        value: response.data[i].iso2,
                        label: response.data[i].name
                    })
                }
                setStateData(stateArray);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <View>
                <LeftIcon>
                    <Octicons name='globe' size={30} color={brand} />
                </LeftIcon>
                <StyledInputLabel>Country</StyledInputLabel>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={countryData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Country' : '...'}
                    searchPlaceholder="Search..."
                    value={country}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setCountry(item.value);
                        handleState(item.value);
                        setCountryName(item.label)
                        setIsFocus(false);
                    }}

                />
            </View>
            <View>
                <LeftIcon>
                    <Octicons name='globe' size={30} color={brand} />
                </LeftIcon>
                <StyledInputLabel>State</StyledInputLabel>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={stateData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select State' : '...'}
                    searchPlaceholder="Search..."
                    value={state}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setState(item.value);
                        setStateName(item.label);
                        setIsFocus(false);
                    }}
                />
            </View>
        </View >
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // padding: 8,
    },
    dropdown: {
        backgroundColor: secondary,
        padding: 15,
        paddingLeft: 55,
        paddingRight: 15,
        borderRadius: 5,
        height: 60,
        marginVertical: 3,
        marginBottom: 10
    },
    icon: {
        right: '15px',
        top: '38px',
        position: 'absolute',
        zIndex: 1
    },
    label: {
        position: 'absolute',
        backgroundColor: secondary,
        left: 22,
        top: 8,
        zIndex: 100,
        paddingHorizontal: 8,
        fontSize: 14,
        placeholderTextColor: "#9CA3AF"
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#9CA3AF",
        placeholderTextColor: "#9CA3AF"
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});