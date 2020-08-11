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
      <button> Your Stored Situations </button>
      //Dropdown menu w/checkboxes? -- Situation 7, Situation 8, Situation 16
      <button> Submit Situations </button>
      <button> Delete Situations </button>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
