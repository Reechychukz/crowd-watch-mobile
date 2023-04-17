import React from 'react'
import Comments from '../components/Comments'
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


const CommentSreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '100%' }}>
                <StatusBar backgroundColor='white' barStyle='dark-content' animated={true} />
                <ScrollView>
                    <Comments />
                </ScrollView>
                <View style={styles.commentInput}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Add a comment'
                        multiline
                    />
                    <Ionicons name='ios-send-outline' size={25} onPress={() => { }} />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    commentInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: '8%',
        width: '100%'
    },
    textInput: {
        width: '100%',
        fontSize: 20,
        opacity: 0.5
    }
})
export default CommentSreen