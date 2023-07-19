import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, Image, Platform, PermissionsAndroid, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setDemandes } from '../../actions/demandesActions';
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';





const Demandes = () => {
    const token = useSelector((state) => state.user.token);
    const client_id = useSelector((state) => state.user.userData.id);
    const demandes = useSelector((state) => state.demandes.demandes);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchDemandes();
    });

    const fetchDemandes = async () => {
        try {
            const response = await fetch('http://10.0.2.2/RAMSA/api/demandes.php', {
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
                dispatch(setDemandes(data)); // Dispatch the action to set the demandes
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const download = (demande) => {
        const url = 'http://10.0.2.2/RAMSA/assets/demandes/' + demande.file_path;
        const { config, fs } = RNFetchBlob;
        const downloadDir = fs.dirs.DownloadDir;

        // Extract the filename from the URL
        const filename = url.substring(url.lastIndexOf('/') + 1);

        const options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: `${downloadDir}/${filename}`, // Use the extracted filename
                description: 'PDF File',
            },
        };

        config(options)
            .fetch('GET', url)
            .then((res) => {
                console.log('File downloaded at: ', res.path());
            })
            .catch((error) => {
                console.log('Error downloading file: ', error);
            });
    };
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Vos Demandes</Text>

                {/* <Button title="Refresh" onPress={handleRefresh} /> */}
                {demandes.length > 0 ? (
                    <View style={styles.table}>
                        <View style={styles.table_head}>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.table_head_captions}>Type du demande</Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.table_head_captions}>Etat</Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.table_head_captions}>Action</Text>
                            </View>
                        </View>

                        {demandes.map((demande) => (
                            <View style={styles.table_body_single_row} key={demande.demande_id}>
                                <View style={{ width: '40%' }}>
                                    <Text style={styles.table_data}>{demande.demande_name}</Text>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Text style={styles.table_data}>{demande.etat === 0 ? 'NonTraité' : 'Traité'}</Text>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Text style={styles.table_data}>
                                        {demande.etat == 0 ? (
                                            <View style={styles.disabled_button}>
                                                <Text style={{ color: 'white' }}>Télécharger</Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity style={{ padding: 5, backgroundColor: '#1c488c' }} onPress={() => download(demande)} ><Text style={{ color: 'white' }}>Télécharger</Text></TouchableOpacity>
                                        )}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text>Il n'y a aucune demande</Text>
                )}
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1c488c',
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    table: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        backgroundColor: '#fff',
    },
    table_head: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 7,
        backgroundColor: '#1c488c',
    },
    table_head_captions: {
        fontSize: 15,
        color: 'white',
    },
    table_body_single_row: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 7,
    },
    table_data: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    disabled_button: {
        opacity: 0.5,
        backgroundColor: '#1c488c',
        padding: 5,
    },
    enabled_button: {
        backgroundColor: '#1c488c',
        padding: 5,
    },
});

export default Demandes;
