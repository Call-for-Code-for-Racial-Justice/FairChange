import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';

export default function template() {
  function startRecording() {
    alert('recording')
  }


  return (
    <View>
      <Text> Thanks for using JustReform. Your scenario has been saved. </Text>
      <button> Submit to JustReform </button>
      <button> Delete Scenario </button>    
    </View>
  );
}

const styles = StyleSheet.create({
  
});
