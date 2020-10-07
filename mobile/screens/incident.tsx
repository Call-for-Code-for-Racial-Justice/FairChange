import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native'
import { Text, View } from '../components/Themed'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av';
import * as Location from 'expo-location'
import MapView, { Marker, MarkerAnimated } from 'react-native-maps'
import axios from 'react-native-axios'
import * as FileSystem from 'expo-file-system';

export default function incident() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [cameraRef, setCameraRef] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [location, setLocation] = useState({})
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: -160,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  })
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: -160,
  })

  const [modalVisible, setModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false)
  const [video, setVideo] = useState({})

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
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      })
      setMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }

    async function cameraInit() {
      const { status } = await Camera.requestPermissionsAsync()
      const { audioStatus } = await Audio.requestPermissionsAsync()
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

  async function startRecording() {
    setIsRecording(true)
    if (cameraRef) {
      const { uri, codec = "mp4" } = await cameraRef.recordAsync()
      console.log(uri)
      setVideo({ uri, codec })
      return { uri, codec }
    }
  }

  function stopRecording() {
    setIsRecording(false)
    setModalVisible(true)
    if (cameraRef) {
      cameraRef.stopRecording()
    }
  }

  async function storeIncident() {
    setModalVisible(false)
    const date = new Date()
    const eventObject = {
      timestamp: Date.now(),
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    }
    const incidentResponse = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/storeIncident',
      data: eventObject
    })

    const incidentId = incidentResponse.data.id
    return incidentId
  }

  async function uploadVideo(incidentId: String) {
    console.log("incidentId is:", incidentId)

    const type = `video/${video.codec}`;
    const uri = video.uri
    const formData = new FormData();
    formData.append("incidentVideo", { type, uri, type, name: `video.${video.codec}` });

    const payload = {
      method: 'post',
      headers: { 'content-type': 'multipart/form-data' },
      url: 'http://localhost:3000/api/upload',
      params: { incident: incidentId },
      data: formData
    }

    axios(payload).then(r => {
      console.log("no way", r)
    }).catch(e => {
      console.log(e)
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
              style={styles.mapStyle} >
              <Marker coordinate={marker}
                title="test"
                description="test"
              />
            </MapView>
          </View>
        </View>
      </View>
      <View style={styles.cameraContainer}>
        <View style={styles.spacer}>
          <Camera style={styles.cameraContainer} type={type} ref={ref => {
            setCameraRef(ref);
          }}>
          </Camera>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!isRecording ? <Button title="start video capture" onPress={() => startRecording()} /> :
          <Button title="stop video capture" onPress={() => stopRecording()} />}
      </View>
      <Modal
        animationType="none"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Submit Incident to Fairchange?</Text>
            <Text style={styles.modalText}> This incident will be recorded in our database and will be available on our web site for future reference </Text>
            <View style={styles.modalButtonContainer}>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Delete"
              />
              <View style={styles.smallSpacer} />
              <Button onPress={async () => {
                const id = await storeIncident()
                console.log(id)
                uploadVideo(id)
              }}
                title="Submit"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 6,
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
    height: 10,
    width: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 14
  },
  modalButtonContainer: {
    display: "flex",
    flexDirection: "row"
  }
})
