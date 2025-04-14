import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, ScrollView, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const navigation = useNavigation();
  const { userEmail, logout } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);

  const richiesta = async () => {
    try {
      const response = await fetch(`http://192.168.0.12:4111/medicine/${userEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        setTableData(data.cont);
      } else {
        Alert.alert('Errore', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Errore di rete');
    }
  };

  useEffect(() => {
    if (userEmail) {
      richiesta();
    }
  }, [userEmail]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { marginTop: 15, padding: 20, alignItems: 'center' },
    header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    title2: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    divider: { height: 1, width: '100%', backgroundColor: '#ccc', marginVertical: 10 },
    logo: { width: 250, height: 250 },
    table: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 5, overflow: 'hidden', marginTop: 10 },
    tableRowHeader: { flexDirection: 'row', backgroundColor: '#6200ee', paddingVertical: 10 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 10 },
    tableCellHeader: { flex: 1, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 5 },
    tableCellHeader2: { flex: 1, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 0 },
    tableCell: { flex: 1, textAlign: 'center', paddingHorizontal: 5 },
    tableCell2: { flex: 1, textAlign: 'center', paddingHorizontal: 0 },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Repharma</Text>
          {userEmail ? (
            <Button title="Logout" onPress={logout} />
          ) : (
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
          )}
        </View>

        <View style={styles.divider} />

        <Image
          source={require('../assets/logopng.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title2}>Medicinali inseriti</Text>

        {userEmail ? (
          <>
            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <Text style={[styles.tableCellHeader, { flex: 2 }]}>Nome</Text>
                <Text style={styles.tableCellHeader}>Dosaggio</Text>
                <Text style={styles.tableCellHeader}>Orario</Text>
                <Text style={styles.tableCellHeader2}>Dettaglio</Text>
              </View>
              {tableData.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.nome}</Text>
                  <Text style={styles.tableCell}>{item.quantita}</Text>
                  <Text style={styles.tableCell}>{item.orario}</Text>
                  <Icon name="info" size={20} color="#000" style={styles.tableCell2} onPress={() => navigation.navigate('Details', {id: item.id})}/>
                </View>
              ))}
            </View>
            <View style={{ marginTop: 20, width: '100%' }}>
              <Button title="Aggiungi Medicinale" onPress={() => navigation.navigate('AddMedicine')} />
            </View>
          </>
        ) : (
          <Text style={{ marginTop: 20, color: '#777' }}>
            Effettua il login per visualizzare i tuoi medicinali
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
