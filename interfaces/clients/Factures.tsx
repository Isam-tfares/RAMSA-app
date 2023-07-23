import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Factures = () => {
    const [content, setContent] = useState(1);
    const [facturesArchives, setFacturesArchives] = useState([]);
    const [factures, setFactures] = useState([]);
    const token = useSelector((state) => state.user.token);
    const client_id = useSelector((state) => state.user.userData.id);
    const months = ['', 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    const aPayer = [{
        facture_id: 1,
        montant: 199,
        consommation_mois: 5
    }, {
        facture_id: 2,
        montant: 176,
        consommation_mois: 6
    }]
    useEffect(() => {
        fetchFacturesA();
        fetchFactures();
    }, []);
    const fetchFacturesA = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/facturesArchive.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    client_id: client_id,
                }),
            });

            if (response.ok) {
                const donnees = await response.json();
                setFacturesArchives(donnees)// Dispatch the action to set the demandes
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const fetchFactures = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/factures.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    client_id: client_id,
                }),
            });
            if (response.ok) {
                const donnees = await response.json();
                setFactures(donnees)// Dispatch the action to set the demandes
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.router}>
                <TouchableOpacity style={content == 1 ? styles.routerC1 : styles.routerC2} onPress={() => { setContent(2) }}>
                    <Text style={styles.textR}>A Payer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={content == 2 ? styles.routerC1 : styles.routerC2} onPress={() => { setContent(1) }}>
                    <Text style={styles.textR}>Archive</Text>
                </TouchableOpacity>

            </View>
            {
                content == 1 ? (
                    <View style={styles.factures}>
                        {facturesArchives.map((item) => {
                            return (
                                <View key={item.facture_id} style={styles.facture}>
                                    <View>
                                        <Text style={styles.facture_date}>{months[item.consommation_mois]} 2023</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginLeft: 3 }}>
                                            <Text style={{ fontSize: 12 }}>Date de payement </Text>
                                            <Text style={styles.paement_date}>{new Date(item.facture_payement_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text style={styles.facture_montant}>{item.montant} DH </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                ) : (
                    <View style={styles.factures}>
                        {factures.map((item) => {
                            return (
                                <View key={item.facture_id} style={styles.facture}>
                                    <View>
                                        <Text style={styles.facture_date}>{months[item.consommation_mois]} 2023</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginLeft: 3 }}>
                                            <Text style={{ marginLeft: 3, fontSize: 13 }}>Dernier delai pour payement </Text>
                                            <Text style={styles.paement_date}>10 {new Date(item.facture_time).toLocaleDateString("fr-FR", { month: "long" })}</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text style={styles.facture_montant}>{item.montant} DH </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    router: {
        backgroundColor: '#9999aa',
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginTop: 20

    },
    routerC1: {
        width: '49%',
        borderRadius: 10,
        backgroundColor: '#9999aa',
        padding: 10,
    },
    routerC2: {
        width: '49%',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    textR: {
        color: '#1c488c', fontWeight: 'bold', textAlign: 'center'
    },
    factures: {
        marginTop: 30
    },
    facture: {
        backgroundColor: 'white',
        padding: 10,
        width: 340,
        margin: 10,
        height: 60,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    facture_date: {
        fontWeight: 'bold',
        color: '#1c488c',
        fontSize: 14,
        marginLeft: 3
    },
    facture_montant: {
        fontWeight: 'bold',
        color: '#1c488c',
        fontSize: 15,
    },
    paement_date: {
        fontWeight: 'bold',
        color: '#1c488c',
        fontSize: 12
    }
})
export default Factures;
