import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../actions/userActions';

const Login = ({ isLogined, setLogined }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleLogin = async () => {
        if (validateEmail()) {
            setErrorEmail('');
            if (password.length > 2) {
                setErrorPassword('');
                let url = 'http://10.0.2.2/RAMSA/api/login.php';
                let headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };
                let data = {
                    email: email,
                    password: password,
                };
                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.message === 'Connected') {
                            const { token } = response;
                            dispatch(setToken(token));
                            const userData = response.user;
                            userData.password = password;
                            dispatch(setUserData(userData));
                            setLogined(true);
                        } else {
                            Alert.alert(response.message);
                        }
                    })
                    .catch((error) => {
                        Alert.alert('Error ' + error);
                    });
            } else {
                setErrorPassword('Le mot de passe doit contenir au moins 3 caractères.');
            }
        } else {
            setErrorEmail('Veuillez entrer une adresse email valide.');
        }
    };

    const validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    };

    return (
        <View style={styles.body}>
            <View style={styles.imgC}>
                <Image style={styles.img} source={require('../assets/login.jpg')} />
            </View>
            <View style={{ marginBottom: 30, marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>Login</Text>
            </View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#edede9"
            />
            <View style={styles.errorC}>
                <Text style={styles.error}>{errorEmail}</Text>
            </View>
            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#edede9"
            />
            <View style={styles.errorC}>
                <Text style={styles.error}>{errorPassword}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.password}>Mot de passe oubliée ?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={{ marginVertical: 10, width: 300, backgroundColor: 'white', padding: 10 }}>
                <Text style={styles.btnText}>Se connecter</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Image style={styles.img2} source={require('../assets/ramsa-logo.png')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c488c',
    },
    input: {
        width: 300,
        margin: 10,
        padding: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        color: 'white',
    },
    btnText: {
        color: '#1c488c',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    password: {
        fontSize: 10,
        color: 'white',
        margin: 5,
    },
    img: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 60,
        height: 60,
        padding: 10,
    },
    img2: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 70,
        height: 70,
        padding: 10,
    },
    imgC: {
        width: 70,
        height: 70,
        borderRadius: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        height: 80,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
});

export default Login;
