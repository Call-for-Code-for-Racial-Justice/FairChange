import React, { useState, useEffect } from 'react'
import { StyleSheet, Button } from 'react-native'
import { Text, View } from '../components/Themed'
import { Camera } from 'expo-camera'
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import axios from 'react-native-axios'

export default function incident() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [errorMsg, setErrorMsg] = useState("")

  const [location, setLocation] = useState({})
  const [region, setRegion] = useState({
    latitude: 40.678177,
    longitude: -73.944160,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [isRecording, setIsRecording] = useState(false)
  let recordedVideo: object

  useEffect(() => {
    async function locationTracking() {
      const { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }
      let location = await Location.getCurrentPositionAsync({})

      setLocation(location)
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    }

    async function cameraInit() {
      const { status } = await Camera.requestPermissionsAsync()
      setHasCameraPermission(status === 'granted')
      console.log(Camera)
    }

    const locationInterval = setTimeout(() => {
      locationTracking()
    }, 1)


    cameraInit()
    return () => clearTimeout(locationInterval)
  }, [])

  if (hasCameraPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false) {
    return <Text> No camera access </Text>
  }

  function startRecording() {
    setIsRecording(true)
    // if (Camera) {
    //   recordedVideo = await Camera.recordAsync()
    //   // upload recording
    // }
    return null
  }

  function stopRecording() {
    setIsRecording(false)
    // if (Camera) {
    //   Camera.stopRecording()
    // }
  }

  async function saveEvent() {
    const date = new Date()
    const eventObject = {
      timestamp: Date.now(),
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    }
    const incidentId = await axios({
      method: 'POST',
      url: 'http://localhost:3000/storeIncident',
      data: eventObject
    })
    axios({
      method: 'POST',
      url: 'https://localhost:3000/upload',
      param: incidentId,
      data: {
        incidentVideo: recordedVideo
      }
    })
  }

  let locationText = 'Waiting..'
  if (errorMsg) {
    locationText = errorMsg
  } else if (location) {
    locationText = JSON.stringify(location)
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.spacer}>
          <View style={styles.container}>
            <MapView
              region={region}
              style={styles.mapStyle} />
          </View>
        </View>
      </View>
      <View style={styles.cameraContainer}>
        <View style={styles.spacer}>
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
                            )
                        }} />
                </View> */}
          </Camera>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!isRecording ? <Button title="start video capture" onPress={() => startRecording()} /> :
          <Button title="stop video capture" onPress={() => stopRecording()} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 5,
    justifyContent: "space-around",
    alignItems: "center"
  },
  cameraContainer: {
    flex: 5,
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  spacer: {
    width: "90%",
    height: "80%",
    borderWidth: 1,
    borderStyle: "solid"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: "100%",
    height: "100%"
  },
  containerMap: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallSpacer: {
    height: 10
  }
})
