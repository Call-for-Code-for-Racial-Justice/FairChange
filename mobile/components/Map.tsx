import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import locationTracking from '../hooks/locationTracking'

export default function Map() {

    let region = {

    }
    async () => {
        let location = await locationTracking()
        region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
        }
        console.log(region)
    }

    return (
        <View style={styles.container}>
            <MapView initialRegion={{
                latitude: 40.678177,
                longitude: -73.944160,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={styles.mapStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: "100%",
        height: "100%"
    },
});
