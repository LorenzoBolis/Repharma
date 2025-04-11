import React from "react";
import { View, Text, SafeAreaView, Button, ScrollView, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();

    const tableData = [
        { id: 1, name: 'Paracetamolo', dosage: '500mg', frequency: '2 volte al giorno' },
        { id: 2, name: 'Ibuprofene', dosage: '200mg', frequency: '1 volta al giorno' },
        { id: 3, name: 'Vitamina C', dosage: '1g', frequency: '1 volta al giorno' },
    ];

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
        tableCell: { flex: 1, textAlign: 'center', paddingHorizontal: 5 },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Repharma</Text>
                    <Button title="Login" onPress={() => navigation.navigate('Login')} />
                </View>

                <View style={styles.divider} />

                <Image
                    source={require('../assets/logopng.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.title2}>Medicinali inseriti</Text>

                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={[styles.tableCellHeader, { flex: 2 }]}>Nome</Text>
                        <Text style={styles.tableCellHeader}>Dosaggio</Text>
                        <Text style={styles.tableCellHeader}>Frequenza</Text>
                    </View>

                    {tableData.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 2 }]}>{item.name}</Text>
                            <Text style={styles.tableCell}>{item.dosage}</Text>
                            <Text style={styles.tableCell}>{item.frequency}</Text>
                        </View>
                    ))}
                    
                    <Button title="Aggiungi Medicinale" onPress={() => navigation.navigate('AddMedicine')}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;