import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    SectionList,
    Pressable,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';

const DATA = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
];

const SECTION_DATA = [
    {
        title: 'Món chính',
        data: [
            { name: 'Phở', image: 'https://i.pinimg.com/474x/71/be/38/71be38e661f54b84d359cf5bb4250624.jpg' },
            { name: 'Bún chả', image: 'https://i.pinimg.com/474x/64/50/df/6450df149d038711341fdbacaa94079e.jpg' },
            { name: 'Cơm tấm', image: 'https://i.pinimg.com/474x/9d/fe/ed/9dfeedfe2ad30191f939c56cc65ddf82.jpg' },
        ],
    },
    {
        title: 'Món tráng miệng',
        data: [
            { name: 'Chè', image: 'https://i.pinimg.com/474x/9a/8e/6a/9a8e6a1565b23245a1a7cbf866456068.jpg' },
            { name: 'Bánh flan', image: 'https://i.pinimg.com/474x/93/af/35/93af35792cb4c4892173d0786cf95743.jpg' },
            { name: 'Kem', image: 'https://i.pinimg.com/474x/ec/a4/98/eca4989d9f94957a573bab8d05380323.jpg' },
        ],
    },
];

const FlatListSectionListScrollView = () => {
    const [selectedItem, setSelectedItem] = useState('');

    const handlePress = (item) => {
        setSelectedItem(item);
        Alert.alert('Xác nhận', `Bạn đã chọn: ${item}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* FlatList */}
                <Text style={styles.header}>FlatList:</Text>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    nestedScrollEnabled
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [
                                styles.item,
                                pressed && styles.itemPressed,
                            ]}
                            onPress={() => handlePress(item.title)}
                        >
                            <View style={styles.itemContent}>
                                <Text style={styles.itemText}>{item.title}</Text>
                            </View>
                        </Pressable>
                    )}
                />

                {/* SectionList */}
                <Text style={styles.header}>SectionList:</Text>
                <SectionList
                    sections={SECTION_DATA}
                    keyExtractor={(item, index) => item.name + index}
                    nestedScrollEnabled
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handlePress(item.name)}
                        >
                            <View style={styles.itemContent}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={styles.itemText}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                />

                {selectedItem ? (
                    <Text style={styles.selectedText}>Đã chọn: {selectedItem}</Text>
                ) : null}
            </View>
        </ScrollView>
    );
};

// Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#e8f5e9', // Màu nền tổng quan
    },
    container: {
        flex: 1,
    },
    item: {
        padding: 15,
        marginVertical: 8, // Khoảng cách giữa các mục
        borderRadius: 8,
        backgroundColor: '#f0f4c3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Tăng độ đổ bóng
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        transition: 'all 0.3s ease', // Hiệu ứng khi hover
    },
    itemPressed: {
        backgroundColor: '#dce775',
        transform: [{ scale: 0.98 }], // Hiệu ứng khi nhấn
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 15, // Tăng khoảng cách giữa ảnh và chữ
    },
    itemText: {
        fontSize: 18, // Tăng kích thước chữ
        color: '#33691e',
        fontWeight: 'bold',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24, // Kích thước tiêu đề lớn hơn
        marginVertical: 15,
        color: '#1b5e20',
        textTransform: 'uppercase', // Chuyển chữ hoa
        textAlign: 'center', // Canh giữa tiêu đề
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#558b2f',
        backgroundColor: '#dcedc8', // Màu nền header section
        borderRadius: 8,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
        color: '#004d40',
        textAlign: 'center',
        fontStyle: 'italic', // Kiểu chữ nghiêng
    },
});

export default FlatListSectionListScrollView;
