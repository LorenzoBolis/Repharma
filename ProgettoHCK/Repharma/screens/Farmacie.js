import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function FarmacieVicino() {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchPharmacies = async (lat, lon) => {
    try {
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22pharmacy%22](around:4000,45.65,9.5936);out;`;
        
        console.log("Requesting:", overpassUrl);

      const response = await fetch(overpassUrl);
      const data = await response.json();

      console.log("Pharmacies found:", data.elements?.length || 0);

      setPharmacies(data.elements || []);
    } catch (error) {
      console.error("Errore nel caricamento delle farmacie:", error);
      Alert.alert("Errore", "Non è stato possibile caricare le farmacie.");
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permesso negato", "Non è possibile ottenere la posizione.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchPharmacies(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error("Errore nella posizione:", error);
      Alert.alert("Errore", "Non è stato possibile ottenere la posizione.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const openInMaps = (lat, lon, name) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
    Linking.openURL(url);
  };

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 15 }}>Caricamento in corso...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topper}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" style={styles.backText} size={24} color="#333" />
        </TouchableOpacity>
        <Text style={{fontWeight:'bold', fontSize:20}}>Farmacie</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {pharmacies.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: pharmacy.lat, longitude: pharmacy.lon }}
            title={pharmacy.tags.name || "Farmacia"}
            description={pharmacy.tags?.operator || "Clicca per info"}
            onCalloutPress={() => openInMaps(pharmacy.lat, pharmacy.lon, pharmacy.tags.name)}
          />
        ))}
      </MapView>

      <ScrollView style={styles.list}>
        {pharmacies.map((pharmacy, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => openInMaps(pharmacy.lat, pharmacy.lon, pharmacy.tags.name)}
          >
            <Text style={styles.name}>{pharmacy.tags.name || "Farmacia"}</Text>
            <Text style={styles.details}>{pharmacy.tags?.operator || "Nessun operatore"}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1 },
  list: { maxHeight: 200, backgroundColor: '#f9f9f9' },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  details: {
    color: '#666',
  },
  topper:{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10, padding:5, paddingTop:25},
  closeButton: {  backgroundColor: '#dedede', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, zIndex: 1, },
  closeText: { fontSize: 20, fontWeight: 'bold', color: '#333'},
  backText: { fontSize: 20, fontWeight: 'bold', color: '#333', paddingVertical:3},
});
