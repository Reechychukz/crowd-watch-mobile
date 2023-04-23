import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Video } from 'expo-av';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { geocodeAsync } from 'expo-location';
// import { setGoogleApiKey } from 'expo-location';
import Constants from 'expo-constants';

import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoicmVlY2h5Y2h1a3oiLCJhIjoiY2xnN2Q0OXF1MDQybTNkcnZnNHZ3aHN2eSJ9.lrTTvWEhjmzrShv8HWxTJw')


const { width, height } = Dimensions.get('window');

// Set your Google API key
//setGoogleApiKey('AIzaSyAbLO-NJoYcApUD5g9yXg3sfcMB6ApCt9w');

const PLACEHOLDER_IMG = 'https://www.brownweiraub.com/wp-content/uploads/2017/09/placeholder'

//MapboxGL.setAccessToken(Constants.manifest?.extra?.mapBoxAccessToken);

const FormikPostUploader = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [mediaUrl, setMediaUrl] = useState([]);
    const [address, setAddress] = useState('');
    const [caption, setCaption] = useState('');
    const [region, setRegion] = useState(null);
    const [showMap, setShowMap] = useState(false);

    const player = useRef(null);

    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    useEffect(() => {
        // Customize the map style using the Bing Maps REST APIs
        fetch(`http://dev.virtualearth.net/REST/v1/Imagery/MapStyles/Aerial?key=${BingMapsApiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const style = [
                    {
                        featureType: 'all',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }],
                    },
                ];

                // Add the map style to the state
                setMapStyle(style.concat(data.resourceSets[0].resources[0].style));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // useEffect(() => {
    //     const getCoordinates = async () => {
    //         const result = await geocodeAsync(address);
    //         if (result.length > 0) {
    //             const { latitude, longitude } = result[0];
    //             setRegion({
    //                 latitude,
    //                 longitude,
    //                 latitudeDelta: 0.0922,
    //                 longitudeDelta: 0.0421,
    //             });
    //         }
    //     };
    //     getCoordinates();
    // }, [address]);

    // const getThumbnailUri = (mediaArray) => {
    //     if (mediaArray.length > 0) {
    //         console.log(mediaArray);
    //         if (mediaArray[0].endsWith('.mp4' || '.mov')) {
    //             useEffect(() => {
    //                 async function extractThumbnail() {
    //                     try {
    //                         const video = await Video.createAsync({ uri: videoUrl });
    //                         const { uri } = await video.getThumbnailAsync();
    //                         setThumbnailUrl(uri);
    //                     } catch (error) {
    //                         console.log(error);
    //                     }
    //                 }
    //                 extractThumbnail();
    //             }, [videoUrl]);
    //         } else {
    //             useEffect(() => {
    //                 async function extractThumbnail() {
    //                     try {
    //                         const image = await Image.createAsync({ uri: mediaArray[0] });
    //                         const { uri } = await image.getThumbnailAsync();
    //                         setThumbnailUrl(uri);
    //                     } catch (error) {
    //                         console.log(error);
    //                     }
    //                 }
    //                 extractThumbnail();
    //             }, [mediaUrl])
    //         }
    //     }
    //     return
    // }

    const getThumbnailUri = async (mediaArray) => {
        if (mediaArray.length > 0) {
            console.log(mediaArray);
            if (mediaArray[0].endsWith('.mp4' || '.mov')) {
                try {
                    const video = await Video.createAsync({ uri: videoUrl });
                    const { uri } = await video.getThumbnailAsync();
                    return uri;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            } else {
                try {
                    const asset = await MediaLibrary.getAssetInfoAsync(mediaArray[0]);
                    const { uri } = await MediaLibrary.getAssetInfoAsync(asset.localUri);
                    return uri;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        }
        return null;
    }


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
            selectionLimit: true,
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
            setMediaUrl(mediaArray);
            getThumbnailUri(mediaArray);
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
            const mediaUri = [];
            mediaUri.push(result.uri);
            setMediaUrl(mediaUri);
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

                <View style={{
                    margin: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        {/* {!thumbnailUrl[0].endsWith('.png' || '.jpg') && */}
                        <Image
                            source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
                            style={{ width: 100, height: 100 }}
                        />

                    </TouchableOpacity>

                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <TextInput
                            style={{ color: 'black', fontSize: 20 }}
                            placeholder='Write a caption...'
                            placeholderTextColor='gray'
                            multiline={true}
                            onChangeText={(text) => setCaption(text)}
                            //onBlur={handleBlur('caption')}
                            value={caption}
                        />
                    </View>
                </View>
                <Divider width={0.2} orientation='vertical' />
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <TextInput
                        placeholder="Enter address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        onFocus={() => setShowMap(true)}
                        onBlur={() => setShowMap(false)}
                        onSubmitEditing={(event) => handleGeocode(event.nativeEvent.text)}
                    />
                    {true && (
                        <View style={styles.mapContainer}>
                            <Mapbox.MapView
                                style={styles.map}
                            />
                        </View>

                    )}
                </View>
                {/* <TextInput
                                onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                                style={{ color: 'black', fontSize: 18 }}
                                placeholder='Enter image url...'
                                placeholderTextColor='gray'
                                onChangeText={handleChange('imageUrl')}
                                onBlur={handleBlur('imageUrl')}
                                value={values.imageUrl}
                            /> */}



                {/* {errors.imageUrl && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.imageUrl}
                    </Text>
                )} */}

                {/* <Button onPress={handleSubmit} title='Share' disabled={!isValid} /> */}


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
    mapContainer: {
        height: 300,
        width: 300
    },
    map: {
        flex: 1
    }
});
export default FormikPostUploader