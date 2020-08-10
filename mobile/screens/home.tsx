import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import Axios from 'react-native-axios';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function home() {
  function startRecording() {
    alert('recording')
  }


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="upload"
          disabled
        />
        <Button
          title="record and alert"
          color="red"
          onPress={() => startRecording()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
