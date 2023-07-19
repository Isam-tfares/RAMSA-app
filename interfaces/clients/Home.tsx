import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, FlatList, Image, TextInput, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDemandes, addDemande } from '../../actions/demandesActions';
import DatePicker from 'react-native-datepicker';
import SelectDropdown from 'react-native-select-dropdown'

const Home = () => {
    const dispatch = useDispatch();
    const client_id = useSelector((state) => state.user.userData.id);
    const token = useSelector((state) => state.user.token);
    const [demandesTypes, setDemandesTypes] = useState([]);
    const [isDemanderVisible, setDemanderVisible] = useState(false);
    const [demandeVisible, setDemandeVisible] = useState(null);
    const [historique_date, setHistorique_date] = useState("");
    const [historique_date_debut, setHistorique_date_debut] = useState("");
    const [historique_date_fin, setHistorique_date_fin] = useState("");
    const [contrats, setContrats] = useState([]);
    const [contratSelected, setContratSelected] = useState(0);

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

    useEffect(() => {
        fetchDemandes();
        fetchContrats();
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
            console.log('Error: ', error);
        }
    };

    const handleAddDemande = async (demandeType) => {
        if (demandeType.historique_date && historique_date == "") {

            throw new Error("Historique date is required");

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
                    historique_date: demandeType.historique_date == 1 ? historique_date : "",
                    historique_date_debut: demandeType.historique_date_debut == 1 ? historique_date_debut : "",
                    historique_date_fin: demandeType.historique_date_fin == 1 ? historique_date_fin : "",
                    contrat_id: demandeType.contrat_id == 1 ? contratSelected : "",
                    token: token,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                Alert.alert('Success', data);
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
                    {item.historique_date == 1 ? (<TextInput
                        placeholder="Enter Date  (Y-M-D)"
                        value={historique_date}
                        onChangeText={setHistorique_date}
                        placeholderTextColor='#192944'
                        style={{ backgroundColor: "#edede9", color: '#192944', marginTop: 10, width: 250 }}
                    />) : (
                        <></>
                    )}
                    {item.historique_date_debut == 1 ? (<><TextInput
                        placeholder="Enter Date  (Y-M-D) "
                        value={historique_date_debut}
                        onChangeText={setHistorique_date_debut}
                        placeholderTextColor='#192944'
                        style={{ backgroundColor: "#edede9", color: '#192944', marginTop: 10, width: 250 }}
                    />
                        <TextInput
                            placeholder="Enter Date  (Y-M-D)"
                            value={historique_date_fin}
                            onChangeText={setHistorique_date_fin}
                            placeholderTextColor='#192944'
                            style={{ backgroundColor: "#edede9", color: '#192944', marginTop: 10, width: 250 }}
                        />
                    </>) : (
                        <></>
                    )}
                    {item.contrat_id == 1 ? (
                        <SelectDropdown
                            data={contrats.map((item) => item.adresse_local)}
                            onSelect={(selectedItem, index) => {
                                setContratSelected(contrats[index].contrat_id);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            defaultButtonText="Séléctionner le contrat "
                            dropdownStyle={{ width: 250, marginTop: 10 }}
                            buttonStyle={{ width: 250, marginTop: 10 }}
                            buttonTextStyle={{ fontSize: 16 }}
                            rowTextStyle={{ fontSize: 16 }}
                        />
                    ) : (
                        <></>
                    )}

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
