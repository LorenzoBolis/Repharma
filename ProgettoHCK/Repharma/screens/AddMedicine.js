import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddMedicine = () => {
  const navigation = useNavigation();
  const [nome, setName] = useState('');
  const [quantita, setDosage] = useState('');
  const [orario, setFrequency] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const { userEmail } = useContext(AuthContext);

  const aggiunta = async () => {
    const mail_utente = userEmail;

    try {
      const response = await fetch('http://10.1.1.228:4111/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, quantita, orario, mail_utente }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Inserimento completato');
        navigation.navigate("Home");
      } else {
        Alert.alert('Errore', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Errore di rete');
    }
  };

  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setSelectedTime(selectedDate);
      const formattedTime = selectedDate.toTimeString().slice(0, 5); // HH:mm
      setFrequency(formattedTime);
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
        maxLength={35}
      />

      <TextInput
        placeholder="Dosaggio"
        value={quantita}
        onChangeText={setDosage}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text style={{ color: orario ? '#000' : '#888' }}>
          {orario || 'Seleziona orario'}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="spinner"
          is24Hour={true}
          onChange={onTimeChange}
        />
      )}

      <Button title="Aggiungi" onPress={aggiunta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9'
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#dedede',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 1
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  }
});

export default AddMedicine;