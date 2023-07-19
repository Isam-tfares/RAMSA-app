import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';

const DatePickerExample = () => {
    const [date, setDate] = useState('');

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const handlePress = () => {
        Alert.alert('Selected Date', date);
    };

    return (
        <View style={styles.container}>
            <DatePicker
                style={styles.datePickerStyle}
                date={date}
                mode="date"
                placeholder="Select Date"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2100-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: styles.dateInputStyle,
                    dateText: styles.dateTextStyle,
                    placeholderText: styles.placeholderTextStyle,
                }}
                onDateChange={handleDateChange}
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerStyle: {
        width: 200,
        marginBottom: 20,
    },
    dateInputStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    dateTextStyle: {
        fontSize: 16,
        color: '#000',
    },
    placeholderTextStyle: {
        fontSize: 16,
        color: '#aaa',
    },
    button: {
        backgroundColor: '#1c4282',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DatePickerExample;
