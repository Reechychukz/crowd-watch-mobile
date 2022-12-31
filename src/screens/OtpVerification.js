import React, { useState, useEffect } from 'react';
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
import ResendTimer from '../components/ResendTimer';

//verification modal
import VerificationModal from '../components/VerificationModal';

const Verification = () => {
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);

    //verification button
    const [verifying, setVerifying] = useState(false);


    const MAX_CODE_LENGTH = 4;

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationSuccessful, setverificationSuccessful] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');

    //resend timer
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const [activeResend, setActiveResend] = useState(false);

    const [resendingEmail, setResendingEmail] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');

    let resendTimerInterval;

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTIme = +new Date() + targetTimeInSeconds * 1000;

        resendTimerInterval = setInterval(() => calculateTImeLeft(finalTIme), 1000)
    }

    const calculateTImeLeft = (finalTime) => {
        const difference = finalTime - +new Date();

        if (difference >= 0) {
            setTimeLeft(Math.round(difference / 1000));
        } else {
            clearInterval(resendTimerInterval);
            setActiveResend(true);
            setTimeLeft(null);
        }
    }

    useEffect(() => {
        triggerTimer();

        return () => {
            clearInterval(resendTimerInterval);
        }
    }, []);

    const resendEmail = async () => {

    }

    const submitOtpVerification = () => {

    }

    //persisting login after verification
    const persistLoginAfterOTPVerification = async () => {

    };

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

                    <ResendTimer
                        activeResend={activeResend}
                        resendingEmail={resendingEmail}
                        resendStatus={resendStatus}
                        timeLeft={timeLeft}
                        targetTime={targetTime}
                        resendEmail={resendEmail} />
                </BottomHalf>

                <VerificationModal
                    successful={verificationSuccessful}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    requestMessage={requestMessage}
                    persistLoginAfterOTPVerification={persistLoginAfterOTPVerification} />

            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

export default Verification;