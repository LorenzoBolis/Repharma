import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddMedicine = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleAddMedicine = () => {
        // Logica per aggiungere il medicinale
        console.log(`Medicinale aggiunto: ${name}, Dosaggio: ${dosage}, Frequenza: ${frequency}`);
        navigation.goBack(); // Torna alla schermata precedente
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aggiungi Medicinale</Text>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Dosaggio"
                value={dosage}
                onChangeText={setDosage}
                style={styles.input}
            />
            <TextInput
                placeholder="Frequenza"
                value={frequency}
                onChangeText={setFrequency}
                style={styles.input}
            />
            <Button title="Aggiungi" onPress={handleAddMedicine} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 },
});

export default AddMedicine;