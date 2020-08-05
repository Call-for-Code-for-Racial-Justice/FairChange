import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log(Camera)
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function record() {
        if (Camera) {
            // const recording = await Camera.recordAsync();
        }
    }

    async function stopRecording() {
        if (Camera) {
            // let stopRecording = await Camera.stopRecording();
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={styles.cameraContainer} type={type}>
                {/* <View
                    style={styles.buttonContainer}>
                    <Button
                        title="flip"
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }} />
                </View> */}
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    }
})
