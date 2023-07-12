import {
    View, Text, TouchableOpacity, Image, TextInput,
    StyleSheet, Alert
} from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../actions/userActions';

export default function UpdateInfos({ setPage }) {
    const dispatch = useDispatch();
    const client = useSelector((state) => state.user.userData);
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleUpdate = async () => {
        if (client.password == password) {
            if (newPassword.length > 2) {

                try {
                    const response = await fetch('http://10.0.2.2/RAMSA/api/clients.php', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            client_id: client.id,
                            password: newPassword,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.text();
                        Alert.alert('Success', data);
                        client.password = newPassword
                        dispatch(setUserData(client));
                    } else {
                        console.log('Error:', response.status);
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            } else {
                Alert.alert("Votre nouveau mot de passe doit avoir plus de 2 caracters");
            }

        } else {
            Alert.alert("Mot de passe actuelle est incorrecte");
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
                    <Text style={{ color: '#07295e', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Mettre a jour Votre mot de passe</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white', borderRadius: 20 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10, marginTop: 5, color: '#07295e' }}>Mot de passe actuelle </Text>
                        <TextInput
                            placeholder="Entrer votre actuelle mot de passe "
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                            placeholderTextColor='#1c488c'
                        />
                    </View>

                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10, marginTop: 5, color: '#07295e' }}>Nouveau mot de passe</Text>
                        <TextInput
                            placeholder="Entrer votre nouveau mot de passe"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
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

