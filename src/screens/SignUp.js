import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import DropdownComponent from "../components/Dropdown";

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto, AntDesign } from '@expo/vector-icons';

//Keyboard Avoiding View
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//API Client
import axios from "axios";

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from "../components/style";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
// const auth = getAuth();
//Colors(
const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {

    const [emailName, setEmailName] = useState('');
    const [password, setPassword] = useState('');

    const [hidePassword, setHidePassword] = useState(true);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null);

        try {
            await createUserWithEmailAndPassword(auth, emailName, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user.email);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        } catch (error) {
            console.log(error);

            setSubmitting(false);
            handleMessage(error.message);
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    function handleSetEmail(email) {
        setEmailName(email);
    }



    const handleGoogleSignin = () => {
        const config = { iosClientId: `108594035886-t0hi24vjlb4a99go0e0qkcps0k785lc9.apps.googleusercontent.com` }
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Crowd Watch</PageTitle>
                    <SubTitle>User Account Signup</SubTitle>
                    <Formik
                        initialValues={{ email: '', userName: '', country: '', state: '', password: '', confirmPassword: '' }}
                        onSubmit={(values, { setSubmitting, setEmailName }) => {
                            console.log(values.email)
                            //handleSetEmail(values.email);
                            console.log(emailName);
                            if (values.email == '' || values.userName == ''

                                || values.password == '' || values.confirmPassword == '') {
                                handleMessage('Please fill all fields');
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Passwords do not match');
                                setSubmitting(false);
                            }
                            else {
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="johndoe@mail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={
                                        handleChange('email')
                                        //setEmailName(email)
                                    }
                                    //onChange={e => setEmailName(e.target.value)}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                                <MyTextInput
                                    label="Username"
                                    icon="person"
                                    placeholder="johndoe123"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('userName')}
                                    onBlur={handleBlur('userName')}
                                    value={values.userName}
                                />

                                <DropdownComponent
                                    onChangeText={handleChange('country')}
                                    value={values.country && values.state}
                                />

                                <MyTextInput
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                    password={values.password}
                                    setPassword={setPassword(password)}
                                />

                                <MyTextInput
                                    label="Confirm Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>

                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Signup</ButtonText>
                                    </StyledButton>)}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}

                                <Line />
                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name="google" color={primary} size={25} />
                                    <ButtonText google={true}>Sign in with Google</ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Already have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;