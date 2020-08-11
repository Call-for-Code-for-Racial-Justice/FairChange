import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';

export default function template() {
  function startRecording() {
    alert('recording')
  }


  return (
    <View>
      <Text> JustReform </Text>
      <button> In a Situation </button>
      <button> Observing a Situation </button>
      <button> dov'é </button>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
