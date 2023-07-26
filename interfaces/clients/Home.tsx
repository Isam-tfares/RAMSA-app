import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, FlatList, Image, TextInput, SafeAreaView, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'

const Home = () => {
    const client_id = useSelector((state) => state.user.userData.id);
    const token = useSelector((state) => state.user.token);
    const [demandesTypes, setDemandesTypes] = useState([]);
    const [demandeVisible, setDemandeVisible] = useState(null);
    const [contrats, setContrats] = useState([]);
    const [localites, setLocalites] = useState([]);
    const [contratSelected, setContratSelected] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [localite, setLocalite] = useState(1);

    const fetchContrats = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/contrats.php', {
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
                const data = await response.json();
                setContrats(data);
            } else {
                console.log('Error 1:  ', response.status);
            }
        } catch (error) {
            console.log('Error 2: ', error);
        }
    };
    const fetchLocalites = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/localites.php', {
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
                const data = await response.json();
                setLocalites(data);
            } else {
                console.log('Error 1:  ', response.status);
            }
        } catch (error) {
            console.log('Error 2: ', error);
        }
    };

    useEffect(() => {
        fetchDemandes();
        fetchContrats();
        fetchLocalites();
    }, []);

    const fetchDemandes = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/demandes_types.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDemandesTypes(data);
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error : ', error);
        }
    };

    const handleAddDemande = async (demandeType) => {
        if (demandeType.demande_type_id == 1) {
            if (address.length < 3) {
                Alert.alert('Données incompletes')
                throw new Error("Données incompletes ");
            }
        } else {
            if (contratSelected == 0) {
                Alert.alert("Selectionner une contrat !")
                throw new Error("Selectionner une contrat ! ");
            }
        }
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/demandes.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    client_id: client_id,
                    demande_type_id: demandeType.demande_type_id,
                    adresse: address,
                    localite: localite,
                    contrat_id: contratSelected,
                    token: token,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                Alert.alert('Success', data);
                setContratSelected(0);
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const HandledemandeVisible = (item) => {
        if (demandeVisible == null || demandeVisible != item.demande_type_id) {
            setDemandeVisible(item.demande_type_id)
        } else {
            setDemandeVisible(null)
        }
    }
    const handleButtonClick = () => {
        setModalVisible(true);
    };
    const handleButtonClose = () => {
        setModalVisible(false);
    };
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
                    {item.demande_type_id == 1 ? (
                        <View>
                            <TouchableOpacity style={styles.demanderButton} onPress={handleButtonClick}>
                                <Text style={styles.demanderButtonText}>Demander</Text>
                            </TouchableOpacity>
                            <Modal visible={modalVisible} animationType="slide">
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                        {/* Address TextInput */}
                                        <TextInput
                                            placeholder="Entrer l'adresse locale"
                                            value={address}
                                            onChangeText={setAddress}
                                            style={{ borderBottomWidth: 1, marginBottom: 10 }}
                                        />

                                        <SelectDropdown
                                            data={localites.map((item) => item.localite_name)}
                                            onSelect={(selectedItem, index) => {
                                                setLocalite(localites[index].localite_id);
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                            defaultValueByIndex={0}
                                            defaultButtonText="Séléctionner le contrat "
                                            dropdownStyle={{ width: 250, marginTop: 10 }}
                                            buttonStyle={{ width: 250, marginTop: 10 }}
                                            buttonTextStyle={{ fontSize: 16 }}
                                            rowTextStyle={{ fontSize: 16 }}
                                        />

                                        {/* Submit Button */}
                                        <TouchableOpacity onPress={() => handleAddDemande(item)} style={{ backgroundColor: '#1c488c', padding: 10, borderRadius: 5, marginTop: 20 }}>
                                            <Text style={{ color: 'white', textAlign: 'center' }}>Demander</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.demanderButton} onPress={handleButtonClose}>
                                            <Text style={styles.demanderButtonText}>Close </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>) : (
                        (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><SelectDropdown
                                data={contrats.map((item) => item.adresse_local)}
                                onSelect={(selectedItem, index) => {
                                    setContratSelected(contrats[index].contrat_id);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                defaultButtonText="Séléctionner le contrat "
                                dropdownStyle={{ width: 250, marginTop: 10 }}
                                buttonStyle={{ width: 250, marginTop: 10 }}
                                buttonTextStyle={{ fontSize: 16 }}
                                rowTextStyle={{ fontSize: 16 }}
                            />
                                <TouchableOpacity style={styles.demanderButton} onPress={() => handleAddDemande(item)}>
                                    <Text style={styles.demanderButtonText}>Demander</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    )}

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
        width: 120,
        padding: 10,
        borderRadius: 5,
    },
    demanderButtonText: {
        color: '#192944',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Home;
