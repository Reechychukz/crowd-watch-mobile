import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';

const Comments = () => {

    const DPImg = 'https://img.freepik.com/free-vector/flat-design-autumnal-background_52683-43406.jpg';

    const Comments = [
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that',
        },
        {
            userDP: DPImg,
            userName: 'bat_eyes',
            comment: 'I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that I can confirm that',
        },
    ]

    return (
        <SafeAreaView style={{}}>
            <View style={{ flex: 1 }}>
                <Divider />
                {Comments.map((data, index) => {
                    return (
                        <View key={index} style={{
                            paddingBottom: 10,
                        }}>
                            <View style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 10
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                                    <Image source={{ uri: data.userDP }}
                                        style={
                                            {
                                                width: 40,
                                                height: 40,
                                                borderRadius: 100
                                            }
                                        } />
                                    <View>
                                        <Text style=
                                            {
                                                {
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    marginLeft: 10
                                                }
                                            }>
                                            {data.userName}
                                        </Text>
                                        <Text style=
                                            {
                                                {
                                                    fontSize: 15,
                                                    fontWeight: 'normal',
                                                    marginLeft: 10,
                                                    maxWidth: '85VW'
                                                }
                                            }>
                                            {data.comment}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

export default Comments