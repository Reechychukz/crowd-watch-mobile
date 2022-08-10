import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "../components/style";


const Welcome = () => {
    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
            <WelcomeImage resizeMode="cover" source={require('../../assets/img/login.jpg')}/>

                <WelcomeContainer>

                    <PageTitle Welcome={true}>Welcome! John</PageTitle>
                    <SubTitle Welcome={true}>John Doe</SubTitle>
                    <SubTitle Welcome={true}>johndoe@mail.com</SubTitle>

                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('../../assets/img/login.jpg')}></Avatar>


                        <Line />

                        <StyledButton onPress={() => { }}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>

                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    )
}

export default Welcome;