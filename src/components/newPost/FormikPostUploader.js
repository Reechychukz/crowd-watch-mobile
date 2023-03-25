import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Video } from 'expo-av';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const PLACEHOLDER_IMG = 'https://www.brownweiraub.com/wp-content/uploads/2017/09/placeholder'
const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.array().of(
        Yup.object().shape(
            Yup.string()
                .url('Image must be a valide url')
                .required('A URL is required'),
        )),
    caption: Yup.string().max(2200, 'Caption has reached the character limit')
})



const FormikPostUploader = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState([]);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={() => openCamera()}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => pickImage()}>
                <Text style={styles.panelButtonTitle}>Choose from Library</Text>
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    )

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            setThumbnailUrl(null);
            alert('Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            orderedSelection: true,
            selectionLimit: 0,
            //aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled === true) {
            console.log('pickerResult is cancelled');
            return;
        }

        console.log(result);

        if (!result.cancelled) {
            const count = Object.keys(result).length;
            let mediaArray = [];
            for (var i = 0; i < count; i++) {
                mediaArray.push(
                    result.selected[i].uri,
                    console.log(result.selected[i].uri)
                );
            }
            console.log(mediaArray)
            setThumbnailUrl(mediaArray);
            bs.current.snapTo(1);
        }
    };

    const openCamera = async () => {
        // No permissions request is necessary for launching the image library
        if (!status.granted) {
            requestPermission
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                setThumbnailUrl(null);
                alert('Permission to access camera roll is required!');
                return;
            }
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {

            setThumbnailUrl(result.uri);
        }
    };

    const bs = React.useRef(null);
    const fall = new Animated.Value(1);

    return (
        <View>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
            />
            <Animated.View style={{
                marginBottom: 550,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <Formik
                    initialValues={{ caption: '', imageUrl: thumbnailUrl }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={uploadPostSchema}
                    validateOnMount={true}
                >
                    {({
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        isValid
                    }) => (
                        <>
                            <View style={{
                                margin: 20,
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                    {!thumbnailUrl[0].endsWith('.mov' || '.jpg') &&
                                        <Image
                                            source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
                                            style={{ width: 100, height: 100 }} />
                                    }
                                    {thumbnailUrl[0].endsWith('.mov' || '.jpg') &&
                                        <Video
                                            source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
                                            style={{ width: 100, height: 100 }} />
                                    }
                                </TouchableOpacity>

                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <TextInput
                                        style={{ color: 'black', fontSize: 20 }}
                                        placeholder='Write a caption...'
                                        placeholderTextColor='gray'
                                        multiline={true}
                                        onChangeText={handleChange('caption')}
                                        onBlur={handleBlur('caption')}
                                        value={values.caption}
                                    />
                                </View>
                            </View>
                            <Divider width={0.2} orientation='vertical' />
                            {/* <TextInput
                                onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                                style={{ color: 'black', fontSize: 18 }}
                                placeholder='Enter image url...'
                                placeholderTextColor='gray'
                                onChangeText={handleChange('imageUrl')}
                                onBlur={handleBlur('imageUrl')}
                                value={values.imageUrl}
                            /> */}



                            {errors.imageUrl && (
                                <Text style={{ fontSize: 10, color: 'red' }}>
                                    {errors.imageUrl}
                                </Text>
                            )}

                            <Button onPress={handleSubmit} title='Share' disabled={!isValid} />

                        </>
                    )}

                </Formik>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});
export default FormikPostUploader