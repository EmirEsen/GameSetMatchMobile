import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TabRanklist = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
        </View>
    );
}

export default TabRanklist

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});