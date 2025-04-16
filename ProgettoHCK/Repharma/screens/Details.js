import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Details({ route }) {
  const { id } = route.params;
  const [medicinale, setMedicinale] = useState({}); 
  const navigation = useNavigation();

  const eliminazione = async() => {
    try {
      const response = await fetch(`http://10.1.1.162:4111/medicine?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Medicinale eliminato");
        navigation.navigate("Home");
      } else {
        Alert.alert('Errore', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Errore di rete');
    }
  }

  const richiesta = async () => {
    try {
      const response = await fetch(`http://10.1.1.162:4111/medicine?id=${id}`, {
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
  }, [id]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F4F4',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
      width: '100%',
      maxWidth: 350,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#6200ee',
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
      marginTop: 15,
    },
    value: {
      fontSize: 18,
      color: '#222',
      marginTop: 5,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      backgroundColor: '#E0E0E0',
      padding: 8,
      borderRadius: 10,
    },
    deleteButton: {
      marginTop: 20,
      backgroundColor: '#ff5252',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },    
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Dettaglio Medicinale</Text>

        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{medicinale.nome || '—'}</Text>

        <Text style={styles.label}>Quantità</Text>
        <Text style={styles.value}>{medicinale.quantita || '—'}</Text>

        <Text style={styles.label}>Orario</Text>
        <Text style={styles.value}>{medicinale.orario || '—'}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={eliminazione}>
          <Text style={styles.deleteButtonText}>Elimina il farmaco</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
