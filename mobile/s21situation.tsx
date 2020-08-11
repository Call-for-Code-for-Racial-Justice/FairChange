import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';

export default function template() {
  function startRecording() {
    alert('recording')
  }


  return (
    <View>
      <Text> Just Reform </Text>
      <button> I am being Followed </button>
      <button> I am being Stopped </button>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
