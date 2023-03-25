import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { TextInput, Divider } from 'react-native-paper';

import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from './style';
// import LagosFire from '../../assets/img/lagos-fire.webp';
// import DPImg from '../../assets/img/dp.jpg'; 


const Posts = () => {
    const LagosFire = 'https://img.freepik.com/free-vector/realistic-autumn-landscape-with-yellow-leaves_23-2149191543.jpg';
    const DPImg = 'https://img.freepik.com/free-vector/flat-design-autumnal-background_52683-43406.jpg';

    const scrollViewRef = useRef();

    const PostInfo = [
        {
            userName: 'MarkDoe121',
            postPersonImage: require('../../assets/img/lagos-fire.webp'),
            caption: "Fire outbreak",
            typeOfEmergency: 'Fire outbreak',
            location: 'Lagos, Nigeria',
            postMedia: [LagosFire, LagosFire],
            upvotes: 300,
            downvotes: 240,
            isUpVoted: false,
            isDownVoted: false,
            comments: [
                {
                    user: 'jondoe',
                    comment: 'Thanks for the update..'
                },
                {
                    user: 'malik750',
                    comment: "Wow... That's sad"
                },
            ]
        },
        {
            userName: 'bat_eyes',
            postPersonImage: DPImg,
            caption: "Fire outbreak",
            typeOfEmergency: 'Fire outbreak',
            location: 'Lagos, Nigeria',
            postMedia: [DPImg, LagosFire],
            upvotes: 100,
            downvotes: 10,
            isUpVoted: false,
            isDownVoted: false,
            comments: [
                {
                    user: 'jondoe',
                    comment: 'Thanks for the update..'
                },
                {
                    user: 'malik750',
                    comment: "Wow... That's sad"
                },
                {
                    user: 'malik750',
                    comment: "Wow... That's sad"
                },
            ]
        },
        {
            userName: 'geulimja',
            postPersonImage: DPImg,
            capiion: "Fire outbreak",
            location: 'Lagos, Nigeria',
            postMedia: [LagosFire, LagosFire],
            upvotes: 150,
            downvotes: 20,
            isUpVoted: false,
            isDownVoted: false,
            comments: [
                {
                    user: 'jondoe',
                    comment: 'Thanks for the update..'
                },
                {
                    user: 'malik750',
                    comment: "Wow... That's sad"
                },
            ]
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
        setActiveIndex(currentIndex);
    };

    const handleSwipe = (direction) => {
        const newIndex = direction === 'right' ? activeIndex - 1 : activeIndex + 1;
        if (newIndex < 0 || newIndex >= data.length) {
            return;
        }
        setActiveIndex(newIndex);
        scrollViewRef.current.scrollTo({ x: newIndex * Dimensions.get('window').width });
    };



    return (

        <View>
            <Divider />
            {
                PostInfo.map((data, index) => {
                    const [upVote, setUpVote] = useState(data.isUpVoted);
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
                                    padding: 10
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
                                <View style={styles.container}>
                                    <ScrollView
                                        horizontal
                                        pagingEnabled
                                        showsHorizontalScrollIndicator={false}
                                        onScroll={handleScroll}
                                        contentContainerStyle={styles.scrollViewContent}
                                        style={styles.scrollView}
                                        ref={scrollViewRef}
                                        scrollEventThrottle={250}
                                    >
                                        {
                                            data.postMedia.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    source={{ uri: image }}
                                                    style={[styles.image, index !== data.postMedia.length - 1 && styles.imageMargin]}
                                                />
                                            ))
                                        }
                                    </ScrollView>

                                    <View style={styles.pagination}>
                                        {data.postMedia.map((item, index) => (
                                            <View key={index} style={[styles.dot, activeIndex === index && styles.dotActive]} />
                                        ))}
                                    </View>

                                    <View style={styles.swipeContainer}>
                                        <View style={styles.swipeButton} onTouchEnd={() => handleSwipe('left')}>
                                            <View style={styles.swipeButtonInner} />
                                        </View>
                                        <View style={styles.swipeButton} onTouchEnd={() => handleSwipe('right')}>
                                            <View style={[styles.swipeButtonInner, styles.swipeButtonInnerRight]} />
                                        </View>
                                    </View>


                                </View>
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                    <TouchableOpacity onPress={() => setUpVote(!upVote)}>
                                        <FontAwesome name={upVote ? 'thumbs-up' : 'thumbs-o-up'}
                                            style={{
                                                paddingRight: 10,
                                                paddingTop: 5,
                                                fontSize: 20,
                                            }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}>
                                        <FontAwesome name='comment-o'
                                            style={{
                                                paddingRight: 10,
                                                paddingTop: 5,
                                                fontSize: 20,
                                            }} />
                                    </TouchableOpacity>

                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text>
                                        Upvoted by{upVote ? ' you and' : ''}{' '}
                                        {upVote ? data.upvotes + 1 : data.upvotes} others
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: 14,
                                            paddingVertical: 2,
                                        }}>
                                        Okay! Keep working
                                    </Text>
                                    {data.comments.length && (
                                        < Text style={{ opacity: 0.4, paddingVertical: 2 }}>

                                            View{data.comments.length > 1 ? ' all' : ''} {data.comments.length}{' '}
                                            {data.comments.length > 1 ? 'comments' : 'comment'}
                                        </Text>
                                    )}

                                    <>
                                        {data.comments.map((comment, index) => (
                                            <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Text style={{ color: 'black' }}>
                                                    <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
                                                    {comment.comment}
                                                </Text>
                                            </View>
                                        ))}
                                    </>

                                    <View
                                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={data.postPersonImage}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    borderRadius: 100,
                                                    backgroundColor: 'orange',
                                                    marginRight: 10
                                                }}
                                            />
                                            <TextInput
                                                placeholder='Add a comment'
                                                style={{ opacity: 0.5 }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        </View>
                                    </View>


                                </View>
                            </View>

                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingRight: 16,
    },
    image: {
        width: Dimensions.get('window').width - 16, // Subtracting 16 to account for margin
        height: 300,
        resizeMode: 'cover',
    },
    imageMargin: {
        marginRight: 16,
    },

    pagination: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#999',
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#333',
    },
})

export default Posts