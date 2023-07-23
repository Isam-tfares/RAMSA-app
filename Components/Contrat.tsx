import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const genereteKey = () => {
    return Math.floor(Math.random() * (1000000));
}
const Contrat = ({ setPage, data }) => {
    const clientData = useSelector((state) => state.user.userData);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: 100, position: 'absolute', top: 0, left: 0 }} onPress={() => setPage(0)}>
                <Image
                    source={require("../assets/back.png")}
                    style={{ width: 50, height: 50 }}
                />
            </TouchableOpacity>
            <Text style={styles.title}>Votre Contrat</Text>
            <View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1c608c' }}>Nom Complet</Text>
                    <Text style={{ fontSize: 15 }}>{clientData.prenom + " " + clientData.nom}</Text>
                </View>

                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1c608c' }}>N° Contrat</Text>
                    <Text style={{ fontSize: 15 }}>{data.contrat_id}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1c608c' }}>Adresse</Text>
                    <Text style={{ fontSize: 15 }}>{data.adresse_local}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1c608c' }}>Localité</Text>
                    <Text style={{ fontSize: 15 }}>{data.localite_name}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1c608c' }}>Date de début du contrat</Text>
                    <Text style={{ fontSize: 15 }}>{data.date_de_debut}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1c608c' }}>Date de fin du contrat</Text>
                    <Text style={{ fontSize: 15 }}>{data.date_de_fin}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        maxHeight: 400, // Set a maximum height to the ScrollView so it becomes scrollable
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1c488c',
        marginBottom: 10
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    dataContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: 350,
        borderBottomWidth: 1
    }
});

export default Contrat;
