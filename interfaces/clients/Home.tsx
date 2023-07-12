import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDemandes, addDemande } from '../../actions/demandesActions';

const Home = () => {
    const dispatch = useDispatch();
    const client_id = useSelector((state) => state.user.userData.id);
    const [demandesTypes, setDemandesTypes] = useState([]);
    const [isDemanderVisible, setDemanderVisible] = useState(false);
    const [demandeVisible, setDemandeVisible] = useState(null);

    useEffect(() => {
        fetchDemandes();
    }, []);

    const fetchDemandes = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/demandes_types.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDemandesTypes(data);
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleAddDemande = async (demandeType) => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/demandes.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: client_id,
                    demande_type_id: demandeType.demande_type_id,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                Alert.alert('Success', data);
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const HandledemandeVisible = (item) => {
        if (demandeVisible == null || demandeVisible != item.demande_type_id) {
            setDemandeVisible(item.demande_type_id)
        } else {
            setDemandeVisible(null)
        }
    }
    const renderDemandeItem = ({ item }) => (
        <View style={styles.demandeItem}>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.demandeName}>{item.demande_name}</Text>
                <TouchableOpacity onPress={() => HandledemandeVisible(item)}>
                    <Image style={styles.demandeIcon} source={require('../../assets/plus-icon.png')} />
                </TouchableOpacity>

            </View>

            {demandeVisible == item.demande_type_id ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.demanderButton} onPress={() => handleAddDemande(item)}>
                        <Text style={styles.demanderButtonText}>Demander</Text>
                    </TouchableOpacity>
                </View>

            ) : <></>}

        </View>
    );

    return (
        <>
            <View style={{ backgroundColor: '#1c4282', paddingBottom: 10 }}>
                <Text style={styles.title}>Bienvenue à l'application RAMSA </Text>
                <Text style={styles.description}>Vous pouvez faire une demande ici :</Text>
            </View>
            <ImageBackground source={require('../../assets/RAMSA.jpg')} style={styles.backgroundImage}>
                <FlatList
                    data={demandesTypes}
                    renderItem={renderDemandeItem}
                    keyExtractor={(item) => item.demande_type_id.toString()}
                    numColumns={1}
                    contentContainerStyle={styles.demandesContainer}
                />
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#fff',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    },
    demandesContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    demandeItem: {
        padding: 17,
        backgroundColor: 'rgba(28, 72, 140, 0.8)',
        margin: 10,
        // alignItems: 'center',
        borderRadius: 10,
        // flexDirection: 'row',

    },
    demandeIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    demandeName: {
        fontSize: 17,
        color: 'white',
        padding: 1,
    },
    demanderButton: {
        backgroundColor: 'white',
        marginTop: 10,
        width: 80,
        padding: 5,
        borderRadius: 5,
    },
    demanderButtonText: {
        color: '#192944',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    notificationIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    notificationImage: {
        width: 25,
        height: 25,
    },
});

export default Home;
