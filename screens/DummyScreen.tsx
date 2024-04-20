import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define a functional component named DummyScreen
const DummyScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is a dummy screen!</Text>
        </View>
    );
};

// Create a StyleSheet to style our component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light grey background
    },
    text: {
        fontSize: 18,
        color: '#333', // Dark grey text color
    },
});

// Export the DummyScreen component for use in other parts of your app
export default DummyScreen;
