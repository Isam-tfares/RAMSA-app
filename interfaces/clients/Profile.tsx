import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDisconnected } from '../../actions/userActions';
import UpdatePassword from '../../Components/UpdatePassword';
import UpdateInfos from '../../Components/UpdateInfos';
import Contrats from '../../Components/Contrats';


const Profile = ({ setLogined }) => {
    const client = useSelector((state) => state.user.userData);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(setDisconnected());
        setLogined(false);
    };
    if (page == 0) {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#1c488c', paddingVertical: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require("../../assets/profile-outline.png")}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>{client.nom + " " + client.prenom}</Text>
                    </View>
                    <View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoValue}>{client.email}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: 20, padding: 20, }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', width: 120, marginLeft: 10 }} onPress={() => setPage(1)}>
                        <Image
                            source={require("../../assets/update.jpg")}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Mettre a jour les informations personnels</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', width: 120 }} onPress={() => setPage(2)}>
                        <Image
                            source={require("../../assets/password.png")}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Modifier Votre mot de passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', width: 120 }} onPress={() => setPage(3)}>
                        <Image
                            source={require("../../assets/contrats.png")}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Vos contrats</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 45, marginTop: 15 }}>
                    <TouchableOpacity onPress={handleSignOut} style={{ width: 90, alignItems: 'center' }}>
                        <Image
                            source={require("../../assets/deconnexion.png")}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else if (page == 1) {
        return (<UpdateInfos setPage={setPage} />);
    } else if (page == 2) {
        return (
            <UpdatePassword setPage={setPage} />
        );
    } else {
        return (
            <Contrats setPage={setPage} />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 75,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#fff'
    },
    infoContainer: {
        marginTop: 5,
        alignItems: 'center',
    },
    infoValue: {
        marginTop: 5,
        color: 'white'
    },
    signOutButton: {
        marginTop: 20,
        backgroundColor: '#1c488c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 153
    },
    signOutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default Profile;