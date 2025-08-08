import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const WishlistScreen = ({ route, navigation }) => {
    const { wishlist } = route.params || { wishlist: [] };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Wishlist</Text>

            {wishlist.length === 0 ? (
                <Text style={styles.empty}>Your wishlist is empty.</Text>
            ) : (
                <FlatList
                    data={wishlist}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProduct}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    empty: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 50,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    productList: {
        paddingBottom: 30,
    },
    card: {
        width: cardWidth,
        backgroundColor: '#FBEAEC',
        borderRadius: 15,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        resizeMode: 'cover',
        backgroundColor: '#fff',
    },
    title: {
        marginTop: 10,
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    price: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});

export default WishlistScreen;
