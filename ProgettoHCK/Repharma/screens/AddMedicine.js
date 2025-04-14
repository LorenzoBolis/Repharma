import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";


const AddMedicine = () => {
    const navigation = useNavigation();
    const [nome, setName] = useState('');
    const [quantita, setDosage] = useState('');
    const [orario, setFrequency] = useState('');
    const { userEmail } = useContext(AuthContext);

    const aggiunta = async () => {
        const mail_utente = userEmail;
        try {
            const response = await fetch('http://10.1.1.146:4111/medicine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, quantita, orario, mail_utente }),
            });
        
            const data = await response.json();
        
            if (data.success) {
                Alert.alert('Inserimento completato');
                navigation.navigate("Home")
            } else {
                Alert.alert('Errore', data.message);
            }
            } catch (error) {
            console.error(error);
            Alert.alert('Errore di rete');
            }
        };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Aggiungi Medicinale</Text>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Dosaggio"
                value={quantita}
                onChangeText={setDosage}
                style={styles.input}
            />
            <TextInput
                placeholder="Orario"
                value={orario}
                onChangeText={setFrequency}
                style={styles.input}
            />
            <Button title="Aggiungi" onPress={aggiunta} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 },
    closeButton: { position: 'absolute', top: 40, right: 20, backgroundColor: '#dedede', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, zIndex: 1, },
    closeText: { fontSize: 20, fontWeight: 'bold', color: '#333'}
});

export default AddMedicine;