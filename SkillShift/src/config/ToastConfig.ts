import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export const toastConfig = {
  error: ({ text1, text2 }) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText1}>{text1}</Text>
      {text2 && <Text style={styles.errorText2}>{text2}</Text>}
    </View>
  ),
  
  success: ({ text1, text2 }) => (
    <View style={styles.successContainer}>
      <Text style={styles.successText1}>{text1}</Text>
      {text2 && <Text style={styles.successText2}>{text2}</Text>}
    </View>
  ),
  
  info: ({ text1, text2 }) => (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText1}>{text1}</Text>
      {text2 && <Text style={styles.infoText2}>{text2}</Text>}
    </View>
  )
};

const styles = StyleSheet.create({
  errorContainer: {
    width: '90%',
    padding: 15,
    backgroundColor: theme.colors.vermelho, 
    borderRadius: 10,
    borderLeftColor: theme.colors.vermelho,
    borderLeftWidth: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});