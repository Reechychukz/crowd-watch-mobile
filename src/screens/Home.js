import { StatusBar } from 'expo-status-bar'
import React from 'react'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { InnerContainer, PageTitle, StyledContainer } from '../components/style'

const Home = () => {
  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>Home</PageTitle>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

export default Home