import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';

import Map from '../components/Map'
import CameraPopUp from '../components/Camera'

function Separator() {
  return <View style={styles.separator} />;
}

function saveEvent() {
  // logic
}

export default function profile() {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.spacer}>
          <Map />
        </View>
      </View>
      <View style={styles.cameraContainer}>
        <View style={styles.spacer}>
          <CameraPopUp />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="finish" onPress={() => saveEvent()}/>
      </View>
    </View>
  );
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
});
