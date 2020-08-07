import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import Axios from 'react-native-axios';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import CameraPopUp from '../components/Camera'


function Separator() {
  return <View style={styles.separator} />;
}

function pushEvent() {
  let eventObject = {
    latitude: 0,
    longitude: 1
  }

  Axios({
    method: 'POST',
    url: 'http://localhost:3000',
    data: eventObject
  })
}

function startRecording() {
  alert('recording')
  pushEvent()
}

export default function home() {

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="upload"
          onPress={() => alert('upload')}
          disabled
        />
        <Separator />
        <Button
          title="record and alert"
          color="red"
          onPress={() => startRecording()}
        />
      </View>
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  button: {
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
  }
});
