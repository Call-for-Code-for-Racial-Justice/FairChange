import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Navigation from './navigation';

export default function home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Fairchange </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="in a situation"
          color="red"
          onPress={() => navigation.navigate('incidentScreen')}
        />
        <View style={styles.smallSpacer} />
        <Button
          title="observing a situation"
          color="blue"
          onPress={() => navigation.navigate('incidentScreen')}
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
    display: 'none',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
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
  },
  smallSpacer: {
    height: 10,
    width: 10
  },
});
