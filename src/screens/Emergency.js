import React from 'react';
import { StatusBar } from "expo-status-bar";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../components/style";

const Emergency = () => {
  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>Emergency</PageTitle>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

export default Emergency