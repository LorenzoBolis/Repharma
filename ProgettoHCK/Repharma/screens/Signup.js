import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const richiesta_registrazione = async (mail, password) => {
  try {
    const response = await fetch('http://10.1.1.146:4111/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, password }),
    });

    const data = await response.json();

    if (data.success) {
      Alert.alert('Registrazione completata');
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
    divider: { height: 2, width: '75%', backgroundColor: '#ccc', marginTop: 20, marginBottom:10 },
    cont_reg: { flexDirection: 'row', justifyContent: 'center' },
    bbb: { color: '#9847ff', fontSize: 16 },
    closeButton: { position: 'absolute', top: 40, right: 20, backgroundColor: '#dedede', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, zIndex: 1, },
    closeText: { fontSize: 20, fontWeight: 'bold', color: '#333'}
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

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
      <View style={styles.divider} />
      <View style={styles.cont_reg}>
        <Text style={{ paddingRight: 5 }}>Hai già un account? </Text>
        <Text onPress={() => navigation.navigate("Login")} style={styles.bbb}>Accedi</Text>
      </View>
    </View>
  );
};

export default Signup;
