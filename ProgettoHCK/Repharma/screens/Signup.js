import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

// funzione che invia user e password a server NODE per la registrazione
const richiesta_registrazione = async (username, password) => {
    try {
        const response = await fetch('http://10.1.1.188:4111/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          Alert.alert('Resistrazione completata');
        } else {
          Alert.alert('Errore', data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Errore di rete');
      }
};

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
        title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
        input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput 
                placeholder="Email" 
                style={styles.input} 
                onChangeText={setUsername} 
                value={username} 
            />
            <TextInput 
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry 
                onChangeText={setPassword} 
                value={password} 
            />
            <Button title="Registrati" onPress={() => richiesta_registrazione(username, password)} />
        </View>
    );
}

export default Signup;
