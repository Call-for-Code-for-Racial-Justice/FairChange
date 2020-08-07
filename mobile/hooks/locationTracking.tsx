import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function tracking() {
    const [location, setLocation] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let locationList = []
            locationList.push(await Location.getCurrentPositionAsync({}));
            setLocation(location);
        })();
    });

    let response

    if (errorMsg) {
        response = errorMsg
    } else if (location) {
        response = location
    }

    return response
}