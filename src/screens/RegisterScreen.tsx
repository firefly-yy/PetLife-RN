import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RegisterScreen: React.FC = () => {
    return (
        <View style={styles.container}>
        <Text>RegisterScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default RegisterScreen;
