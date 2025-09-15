import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';

const CheckboxRadioButton = () => {
    const [hobbies, setHobbies] = useState({
        sports: false,
        reading: false,
        music: false,
        travel: false,
    });

    const [selectedValue, setSelectedValue] = useState(''); // Trạng thái cho RadioButton

    const handleCheckboxPress = () => {
        const selectedHobbies = Object.keys(hobbies).filter(hobby => hobbies[hobby]);
        if (selectedHobbies.length > 0) {
            Alert.alert('Sở thích của bạn', `Bạn yêu thích: ${selectedHobbies.join(', ')}`);
        } else {
            Alert.alert('Thông báo', 'Hãy chọn ít nhất một sở thích.');
        }
    };

    const handleRadioButtonPress = () => {
        if (selectedValue) {
            Alert.alert('Bạn đã chọn', `Màu: ${selectedValue}`);
        } else {
            Alert.alert('Thông báo', 'Bạn chưa chọn màu nào.');
        }
    };

    const handleImagePress = () => {
        Alert.alert('Hình ảnh', 'Bạn đã nhấn vào hình ảnh!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sở thích và Màu sắc</Text>

            {/* Checkbox */}
            <Text style={styles.subHeader}>Chọn sở thích của bạn</Text>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={hobbies.sports ? 'checked' : 'unchecked'}
                    onPress={() => setHobbies({ ...hobbies, sports: !hobbies.sports })}
                />
                <Text style={styles.label}>Chơi thể thao</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={hobbies.reading ? 'checked' : 'unchecked'}
                    onPress={() => setHobbies({ ...hobbies, reading: !hobbies.reading })}
                />
                <Text style={styles.label}>Đọc sách</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={hobbies.music ? 'checked' : 'unchecked'}
                    onPress={() => setHobbies({ ...hobbies, music: !hobbies.music })}
                />
                <Text style={styles.label}>Nghe nhạc</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={hobbies.travel ? 'checked' : 'unchecked'}
                    onPress={() => setHobbies({ ...hobbies, travel: !hobbies.travel })}
                />
                <Text style={styles.label}>Du lịch</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCheckboxPress}>
                <Text style={styles.buttonText}>Xác nhận Sở thích</Text>
            </TouchableOpacity>

            {/* RadioButton */}
            <Text style={styles.subHeader}>Chọn màu bạn thích</Text>
            <View style={styles.radioContainer}>
                <RadioButton
                    value="Đỏ"
                    status={selectedValue === 'Đỏ' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedValue('Đỏ')}
                />
                <Text style={styles.label}>Đỏ</Text>
            </View>
            <View style={styles.radioContainer}>
                <RadioButton
                    value="Xanh"
                    status={selectedValue === 'Xanh' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedValue('Xanh')}
                />
                <Text style={styles.label}>Xanh</Text>
            </View>
            <View style={styles.radioContainer}>
                <RadioButton
                    value="Vàng"
                    status={selectedValue === 'Vàng' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedValue('Vàng')}
                />
                <Text style={styles.label}>Vàng</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRadioButtonPress}>
                <Text style={styles.buttonText}>Xác nhận RadioButton</Text>
            </TouchableOpacity>

            {/* Image */}
            <Text style={styles.header}>Hãy nhấn vào ảnh</Text>
            <TouchableOpacity onPress={handleImagePress}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/474x/9f/93/03/9f9303eec260bafd951d1224d2b29a4e.jpg' }}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f8ff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
        color: '#34495e',
    },
    button: {
        backgroundColor: '#2980b9',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 150,
        height: 150,
        marginTop: 16,
        alignSelf: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#f39c12',
    },
});

export default CheckboxRadioButton;
