import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Details({ route }) {
  const { id } = route.params;
  const [medicinale, setMedicinale] = useState({}); 

  const navigation = useNavigation();

  const richiesta = async () => {
    try {
      const response = await fetch(`http://192.168.0.12:4111/medicine?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        setMedicinale(data.cont); 
      } else {
        Alert.alert('Errore', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Errore di rete');
    }
  };

  useEffect(() => {
    richiesta();
  }, [id]); // esegue la richiesta quando id cambia

  const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    closeButton: { position: 'absolute', top: 40, right: 20, backgroundColor: '#dedede', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, zIndex: 1 },
    closeText: { fontSize: 20, fontWeight: 'bold', color: '#333' }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Dettaglio Medicinale</Text>
      <Text>Nome</Text>
      <Text>{medicinale.nome}</Text>
      <Text>Quantità</Text>
      <Text>{medicinale.quantita}</Text>
      <Text>Orario</Text>
      <Text>{medicinale.orario}</Text>
    </View>
  );
}
