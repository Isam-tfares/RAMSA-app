import {
    View, Text, TouchableOpacity, Image, TextInput,
    StyleSheet, Alert
} from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../actions/userActions';

export default function UpdateInfos({ setPage }) {
    const client = useSelector((state) => state.user.userData);
    const [email, setEmail] = useState(client.email)
    const [nom, setNom] = useState(client.nom)
    const [prenom, setPrenom] = useState(client.prenom)
    const [adresse, setAdresse] = useState(client.adresse)
    const dispatch = useDispatch();
    const validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    }
    const handleUpdate = async () => {
        if (validateEmail() && nom.length > 0 && prenom.length > 0 && adresse.length > 0) {
            try {
                const response = await fetch('http://10.0.2.2/RAMSA/api/clients.php', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: client.id,
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        adresse: adresse,
                    }),
                });

                if (response.ok) {
                    const data = await response.text();
                    Alert.alert('Success', data);
                    client.nom = nom;
                    client.prenom = prenom;
                    client.email = email;
                    client.adresse = adresse;
                    dispatch(setUserData(client));
                } else {
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            Alert.alert("Données non valides");
        }

    }
    return (
        <>
            <View style={{}}>
                <TouchableOpacity style={{ width: 100 }} onPress={() => setPage(0)}>
                    <Image
                        source={require("../assets/back.png")}
                        style={{ width: 50, height: 50 }}
                    />
                </TouchableOpacity>
                <View style={{ marginBottom: 30, marginTop: 10 }}>
                    <Text style={{ color: '#07295e', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Mettre a jour Vos informations</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white', borderRadius: 20 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10, marginTop: 5, color: '#07295e' }}>Nom </Text>
                        <TextInput
                            placeholder="Nom"
                            value={nom}
                            onChangeText={setNom}
                            autoCapitalize="characters"
                            style={styles.input}
                            placeholderTextColor='#1c488c'
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10, marginTop: 5, color: '#07295e' }}>Prénom</Text>
                        <TextInput
                            placeholder="Prénom"
                            value={prenom}
                            onChangeText={setPrenom}
                            autoCapitalize="words"
                            style={styles.input}
                            placeholderTextColor='#1c488c'
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10, marginTop: 5, color: '#07295e' }}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            placeholderTextColor='#1c488c'
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10, marginTop: 5, color: '#07295e' }}>Adresse locale</Text>
                        <TextInput
                            placeholder="Adresse locale"
                            value={adresse}
                            onChangeText={setAdresse}
                            autoCapitalize="none"
                            style={styles.input}
                            placeholderTextColor='#1c488c'
                        />
                    </View>
                    <TouchableOpacity onPress={handleUpdate} style={{ marginVertical: 15, width: 300, backgroundColor: '#1c488c', padding: 10, borderRadius: 10 }}>
                        <Text style={styles.btnText}>Mettre a jour</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    input: {
        width: 300,
        margin: 10,
        padding: 10,
        borderBottomColor: '#1c488c',
        borderBottomWidth: 2,
        color: '#1c488c',

    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    errorC: {
        textAlign: 'left',
        paddingRight: 190,
        position: 'relative',
        height: 20,
        marginBottom: 10,
    },
    error: {
        position: 'absolute',
        color: '#f94144',
        left: -50,
    }
})

