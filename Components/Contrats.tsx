import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default function Contrats({ setPage, demandeSelected }) {
    const token = useSelector((state) => state.user.token);
    const client_id = useSelector((state) => state.user.userData.id);
    const [contrats, setContrats] = useState([]);

    useEffect(() => {
        fetchContrats();
    });
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
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const download = (contrat) => {
        const url = 'http://10.0.2.2/RAMSA/api/contrats.php?contrat_id=' + contrat;
        console.log(url);
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
                console.log('File downloaded at:', res.path());
            })
            .catch((error) => {
                console.log('Error downloading file:', error);
            });
    };
    return (
        <>
            <View>
                <TouchableOpacity style={{ width: 100 }} onPress={() => setPage(0)}>
                    <Image
                        source={require("../assets/back.png")}
                        style={{ width: 50, height: 50 }}
                    />
                </TouchableOpacity>
                <View style={{ marginBottom: 30, marginTop: 10 }}>
                    <Text style={{ color: '#07295e', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Vos Contrats</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {contrats.length > 0 ? (
                        <View style={styles.table}>
                            <View style={styles.table_head}>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_head_captions}>Adresse</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_head_captions}>Localité</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_head_captions}>Date de début</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_head_captions}>Date de fin</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_head_captions}>Action</Text>
                                </View>
                            </View>

                            {contrats.map((demande) => (
                                <View style={styles.table_body_single_row} key={demande.contrat_id}>
                                    <View style={{ width: '20%' }}>
                                        <Text style={styles.table_data}>{demande.adresse_local}</Text>
                                    </View>
                                    <View style={{ width: '20%' }}>
                                        <Text style={styles.table_data}>{demande.localite_name}</Text>
                                    </View>
                                    <View style={{ width: '20%' }}>
                                        <Text style={styles.table_data}>{demande.date_de_debut}</Text>
                                    </View>
                                    <View style={{ width: '20%' }}>
                                        <Text style={styles.table_data}>{demande.date_de_fin}</Text>
                                    </View>
                                    <View style={{ width: '20%' }}>
                                        <TouchableOpacity onPress={() => download(demande.contrat_id)}>
                                            <Text style={styles.table_data}>Télécharger</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text>Il n'y a aucune contrat</Text>
                    )}
                </View>
            </View>
        </>
    )
}
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

