import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderTopColor: 'pink',
        shadowColor: 'transparent', // Removes shadow
        elevation: 0, // Android shadow removal
        marginTop: Platform.OS === 'ios' ? 50 : 20, // Adjust for iPhone notch
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderTopWidth: 8,
        borderTopColor: 'red',
        borderRadius: 16,
        // padding: 5,
        shadowColor: 'transparent', // Removes shadow
        elevation: 0, // Android shadow removal
        marginTop: Platform.OS === 'ios' ? 15 : 10, // Adjust for iPhone notch
      }}
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
      text1Style={{
        fontSize: 12
      }}
      text2Style={{
        fontSize: 2
      }}
    />
  ),
  ToastMatchAdded: ({ text1, props }) => (
    <View style={[styles.customToast, styles.toastPosition]}>
      <Text style={styles.toastText}>{text1 || 'Match Added'}</Text>
      <Text style={styles.toastSubText}>{props?.uuid || 'N/A'}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  customToast: {
    height: 60,
    width: '100%',
    backgroundColor: 'tomato',
    padding: 10,
    justifyContent: 'center',
    shadowColor: 'transparent', // Removes shadow
    elevation: 0, // Android shadow removal
  },
  toastText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  toastSubText: {
    fontSize: 14,
    color: 'white',
  },
  toastPosition: {
    marginTop: Platform.OS === 'ios' ? 15 : 10, // Adjust for iPhone notch
  },
});
