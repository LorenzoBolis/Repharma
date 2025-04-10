import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

// funzione che invia richiesta a server NODE con user e pwd
const richiesta = async (username, password) => {
    try {
        const response = await fetch('http://10.1.1.188:4111/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          Alert.alert('Login riuscito');
        } else {
          Alert.alert('Errore', data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Errore di rete');
      }
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
        title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
        input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
        divider: { height: 2, width: '75%', backgroundColor: '#ccc', marginTop: 20, marginBottom:10 },
        cont_reg: {display: 'flex', flexDirection:'row' , justifyContent:'center'},
        bbb: { color: '#9847ff', fontSize:16 }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button title="Accedi" onPress={() => richiesta(username, password)} />
            <View style={styles.divider} />
            <View style={styles.cont_reg}>
              <Text style={{paddingRight:5}}>Non hai un account? </Text>
              <Text onPress={() => navigation.navigate("Signup")} style={styles.bbb}>Registrati</Text>
            </View>
        </View>
    );
}

export default Login;
