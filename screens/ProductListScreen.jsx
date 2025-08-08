import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const cardWidth = (width - 50) / 2;

const ProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setFilteredProducts(data.products); // initially show all
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    const handleSearch = (text) => {
        setSearch(text);
        if (text.trim() === '') {
            setProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(text.toLowerCase())
            );
            setProducts(filtered);
        }
    };

    const toggleWishlist = (product) => {
        const isInWishlist = wishlist.find(item => item.id === product.id);
        if (isInWishlist) {
            setWishlist(wishlist.filter(item => item.id !== product.id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => toggleWishlist(item)}
            >
                {wishlist.find(p => p.id === item.id) ? (
                    <FontAwesome name="heart" size={18} color="red" />
                ) : (
                    <Feather name="heart" size={18} color="#666" />
                )}
            </TouchableOpacity>

        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Viorra</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.icon}>
                        <Feather name="bell" size={22} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Feather name="shopping-cart" size={22} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color="#888" />
                    <TextInput
                        placeholder="Search for all products"
                        placeholderTextColor="#888"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            <View style={styles.productSection}>
                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Best Products</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Apply Filter</Text>
                        <Feather name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Total Products */}
                <Text style={styles.totalCount}>{products.length} Products</Text>

                {/* Product Grid */}
                <FlatList
                    style={{ flex: 1 }}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProduct}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                />

            </View>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem}>
                    <Ionicons name="home-outline" size={22} color="#333" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Feather name="tag" size={22} color="#333" />
                    <Text style={styles.footerText}>Offers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => navigation.navigate('Wishlist', { wishlist })}
                >
                    <Feather name="heart" size={22} color="#333" />
                    <Text style={styles.footerText}>Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem}>
                    <Feather name="user" size={22}
                        onPress={() => navigation.navigate('Profile')}
                        color="#333" />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 15,
    },
    logo: {
        fontSize: 23,
        fontWeight: '800',
        color: '#872341',
        fontFamily: 'Georgia',
        paddingHorizontal: 15,
    },
    iconRow: {
        flexDirection: 'row',
        gap: 15,
    },
    icon: {
        padding: 5,
    },
    searchRow: {
        marginTop: 15,
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 45,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: '#333',
    },
    productSection: {
        backgroundColor: '#F9E7DD',
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    filterText: {
        fontSize: 15,
        marginRight: 4,
    },
    totalCount: {
        fontSize: 15,
        fontWeight: 600,
        color: '#555',
        marginBottom: 10,
        marginLeft: 4,
        paddingHorizontal: 10,
    },
    productList: {
        paddingBottom: 120,
        paddingTop: 5,
        paddingHorizontal: 15,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: cardWidth,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        resizeMode: 'cover',
        backgroundColor: '#fff',
    },
    title: {
        marginVertical: 10,
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
    },
    price: {
        fontSize: 12,
        fontWeight: 600,
        color: '#666',
        marginTop: 2,
    },
    heartIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: width,
    },
    footerItem: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        marginTop: 4,
        color: '#333',
    },
});

export default ProductListScreen;
