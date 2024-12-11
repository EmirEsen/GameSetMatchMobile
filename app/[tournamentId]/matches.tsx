import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";

const TabMatches = () => {
    const params = useLocalSearchParams<{ tournamentId: string }>(); // Get all parameters
    const { tournamentId } = params;

    useEffect(() => {
        console.log("Tournament ID:", tournamentId);
    }, [tournamentId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Matches of {tournamentId}</Text>
        </View>
    );
}

export default TabMatches;

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