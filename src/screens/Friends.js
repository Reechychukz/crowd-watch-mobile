import React from 'react';
import { StatusBar } from "expo-status-bar";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../components/style";

const Friends = () => {
  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>Friends</PageTitle>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

export default Friends