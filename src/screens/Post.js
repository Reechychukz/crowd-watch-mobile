import React from 'react'

const Post = () => {
  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>Post</PageTitle>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

export default Post