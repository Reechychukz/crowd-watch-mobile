import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

import {
    Colors,
    StyledTextInput
} from "../components/style";

//Colors
const { brand, darkLight, primary, secondary } = Colors;

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent = () => {

    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [stateName, setStateName] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://api.countrystatecity.in/v1/countries',
            headers: {
                'X-CSCAPI-KEY': 'API_KEY'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                var count = Object.keys(response.data).length;
                let countryArray = [];

                for (let i = 0; i < count; i++) {
                    countryArray.push({
                        value: response.data[i].iso2,
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
            url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
            headers: {
                'X-CSCAPI-KEY': 'API_KEY'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                var count = Object.keys(response.data).length;
                let countryArray = [];

                for (let i = 0; i < count; i++) {
                    countryArray.push({
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

    const handleCity = (countryCode, stateCode) => {
        var config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
            headers: {
                'X-CSCAPI-KEY': 'API_KEY'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                var count = Object.keys(response.data).length;
                let cityArray = [];

                for (let i = 0; i < count; i++) {
                    countryArray.push({
                        value: response.data[i].id,
                        label: response.data[i].name
                    })
                }
                setCityData(cityArray);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#E5E7EB' }}>
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
                        handleCity(country, item.value);
                        setStateName(item.label);
                        setIsFocus(false);
                    }}
                />

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cityData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select City' : '...'}
                    searchPlaceholder="Search..."
                    value={city}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setCity(item.value);
                        setCityName(item.label);
                        setIsFocus(false);
                    }}
                />
            </View>
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E5E7EB',
        // padding: 8,
    },
    dropdown: {
        height: 50,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    icon: {
        left: '15px',
        top: '38px',
        marginRight: 15,
        marginLeft: 15,
    },
    label: {
        position: 'absolute',
        backgroundColor: { secondary },
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