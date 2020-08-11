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
      <button> My Submitted Situations </button>
      //Dropdown menu w/checkboxes? -- Situation 2,  Situation 7, Situation 11
      <button> View Situation </button>
      <button> Delete Situations </button>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
