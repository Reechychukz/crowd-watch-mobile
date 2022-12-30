import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import {
    Colors,
    IconBg,
    PageTitle,
    StyledContainer,
    TopHalf,
    BottomHalf,
    InfoText,
    EmphasizeText,
    StyledButton,
    ButtonText
} from '../components/style';

//Colours
const { brand, green, primary, lightGreen, gray } = Colors;
//Icons
import OctIcons from '@expo/vector-icons/Octicons';
import IonIcons from '@expo/vector-icons/Ionicons';
import CodeInputField from '../components/CodeInputField';
import { ActivityIndicator } from 'react-native-paper';

const Verification = () => {
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);

    //verification button
    const [verifying, setVerifying] = useState(false);

    const MAX_CODE_LENGTH = 4;

    const submitOtpVerification = () => {

    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer
                style={{
                    alignItems: 'center'
                }}>

                <TopHalf>
                    <IconBg>
                        <StatusBar style='dark' />
                        <OctIcons name='lock' size={125} color={brand} />
                    </IconBg>
                </TopHalf>

                <BottomHalf>
                    <PageTitle style={{ fontSize: 25 }} >Account Verification</PageTitle>
                    <InfoText>
                        Please enter the 4-digit code sent to
                        <EmphasizeText> testmail@mail.com</EmphasizeText>
                    </InfoText>

                    <CodeInputField
                        setPinReady={setPinReady}
                        code={code}
                        setCode={setCode}
                        maxLength={MAX_CODE_LENGTH}
                    />

                    {!verifying && pinReady && (
                        <StyledButton
                            style={{
                                backgroundColor: green,
                                flexDirection: 'row'
                            }}
                            onPress={submitOtpVerification}
                        >
                            <ButtonText>Verify</ButtonText>
                            <IonIcons name='checkmark-circle' size={25} color={primary} />
                        </StyledButton>
                    )}

                    {!verifying && !pinReady && (
                        <StyledButton
                            disabled={true}
                            style={{
                                backgroundColor: green,
                                flexDirection: 'row'
                            }}
                        >
                            <ButtonText style={{ color: gray }}>Verify</ButtonText>
                            <IonIcons name='checkmark-circle' size={25} color={gray} />
                        </StyledButton>
                    )}

                    {verifying && (
                        <StyledButton
                            disabled={true}
                            style={{
                                backgroundColor: green,
                                flexDirection: 'row'
                            }}
                            onPress={submitOtpVerification}
                        >
                            <ActivityIndicator size='large' color={primary} />
                        </StyledButton>
                    )}

                </BottomHalf>

            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

export default Verification;