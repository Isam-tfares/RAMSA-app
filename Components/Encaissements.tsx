import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

const genereteKey = () => {
    return Math.floor(Math.random() * (1000000));
}
const Encaissements = ({ setPage, data }) => {
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
            <TouchableOpacity style={{ width: 100, position: 'absolute', top: 0, left: 0 }} onPress={() => setPage(0)}>
                <Image
                    source={require("../assets/back.png")}
                    style={{ width: 50, height: 50 }}
                />
            </TouchableOpacity>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Historique des encaissements</Text>
                <ScrollView horizontal style={styles.scrollView}>

                    <View style={styles.table}>
                        <View style={styles.table_head}>
                            <View style={{ padding: 5, width: '15%' }}>
                                <Text style={styles.table_head_captions}>Numéro de Encaissement</Text>
                            </View>
                            <View style={{ padding: 5, width: '15%' }}>
                                <Text style={styles.table_head_captions}>Mois/Année</Text>
                            </View>
                            <View style={{ padding: 5, width: '15%' }}>
                                <Text style={styles.table_head_captions}>N° Facture</Text>
                            </View>
                            <View style={{ padding: 5, width: '15%' }}>
                                <Text style={styles.table_head_captions}>Montant</Text>
                            </View>
                            <View style={{ padding: 5, width: '20%' }}>
                                <Text style={styles.table_head_captions}>Date de payement</Text>
                            </View>
                            <View style={{ padding: 5, width: '20%' }}>
                                <Text style={styles.table_head_captions}>Mode de payement</Text>
                            </View>
                        </View>

                        {data.map((item) => (
                            <View style={styles.table_body_single_row} key={genereteKey()}>
                                <View style={{ width: '15%' }}>
                                    <Text style={styles.table_data}>{item.encaissement_id}</Text>
                                </View>
                                <View style={{ width: '15%' }}>
                                    <Text style={styles.table_data}>{item.consommation_mois + '/' + item.consommation_annee}</Text>
                                </View>
                                <View style={{ width: '15%' }}>
                                    <Text style={styles.table_data}>{item.facture_id}</Text>

                                </View>
                                <View style={{ width: '15%' }}>
                                    <Text style={styles.table_data}>{item.montant} DH</Text>

                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_data}>{item.encaissement_date}</Text>

                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={styles.table_data}>{item.mode_payement}</Text>

                                </View>
                            </View>
                        ))}
                    </View>

                </ScrollView>
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
    scrollView: {
        flex: 1,
        maxHeight: 400, // Set a maximum height to the ScrollView so it becomes scrollable
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1c488c',
        marginTop: 20
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
        // elevation: 1,
        // backgroundColor: '#fff',
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
        fontSize: 15,
        fontWeight: 'bold',
    },
    disabled_button: {
        opacity: 0.5,
        backgroundColor: '#1c488c',
        padding: 5,
        paddingHorizontal: 20,
    },
    enabled_button: {
        backgroundColor: '#1c488c',
        padding: 5,
    },
    graph: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    graphTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Encaissements;
