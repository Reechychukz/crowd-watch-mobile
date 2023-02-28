import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Posts = () => {
    const postInfo = [
        {
            userName: 'MarkDoe121',
            postPersonImage: require('../../assets/img/dp.jpg'),
            postText: "Fire outbreak",
            typeOfEmergency: 'Fire outbreak',
            location: 'Lagos, Nigeria',
            postMedia: require('../../assets/img/lagos-fire.webp'),
            upvotes: 300,
            downvotes: 240,
            isUpVoted: false,
            isDownVoted: false
        },
        {
            userName: 'bat_eyes',
            postPersonImage: require('../../assets/img/dp.jpg'),
            postText: "Fire outbreak",
            typeOfEmergency: 'Fire outbreak',
            location: 'Lagos, Nigeria',
            postMedia: require('../../assets/img/lagos-fire.webp'),
            upvotes: 100,
            downvotes: 10,
            isUpVoted: false,
            isDownVoted: false
        },
        {
            userName: 'geulimja',
            postPersonImage: require('../../assets/img/dp.jpg'),
            postText: "Fire outbreak",
            typeOfEmergency: 'Fire outbreak',
            location: 'Lagos, Nigeria',
            postMedia: require('../../assets/img/lagos-fire.webp'),
            upvotes: 150,
            downvotes: 20,
            isUpVoted: false,
            isDownVoted: false
        }
    ]
    return (
        <View>
            {
                postInfo.map((data, index) => {
                    const [upVote, setUpVote] = useState(data.isUpVoted);
                    const [downVote, setDownVote] = useState(data.isDownVoted);
                    return (
                        <View key={index} style={{
                            paddingBottom: 10,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.1
                        }}>
                            <View style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 15
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={data.postPersonImage}
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
                                    </View>
                                </View>

                                <Feather name='more-vertical' style={{ fontSize: 20 }} />
                            </View>

                            <View style={{
                                position: 'relative',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={data.postMedia} style={{ width: '100%', height: 400 }} />
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setUpVote(!upVote)}>
                                        <FontAwesome name={upVote ? 'thumbs-up' : 'thumbs-o-up'}
                                            style={{
                                                paddingRight: 10,
                                                paddingLeft: 15,
                                                paddingTop: 5,
                                                fontSize: 25,
                                            }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setDownVote(!downVote)}>
                                        <FontAwesome name={downVote ? 'thumbs-down' : 'thumbs-o-down'}
                                            style={{
                                                paddingRight: 10,
                                                paddingLeft: 15,
                                                paddingTop: 5,
                                                fontSize: 25,
                                            }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    )
                })
            }
        </View>
    )
}

export default Posts