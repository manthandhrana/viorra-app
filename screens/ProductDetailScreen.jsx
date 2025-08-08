// src/screens/ProductDetailScreen.js

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header Image with Back and Share */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Entypo name="share" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.viewSimilar}>
          <Text style={styles.viewSimilarText}>View Similar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <View style={styles.ratingRow}>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const ratingDiff = product.rating - i;

              let iconName = 'star-o'; // default: empty

              if (ratingDiff >= 1) {
                iconName = 'star'; // full
              } else if (ratingDiff >= 0.5) {
                iconName = 'star-half-full'; // or 'star-half-alt' if needed
              }

              return (
                <FontAwesome
                  key={i}
                  name={iconName}
                  size={16}
                  color="#000"
                />
              );
            })}

          </View>
          <Text style={styles.ratingScore}>{product.rating.toFixed(2)}/5</Text>
        </View>

        <Text style={styles.brand}>
          Sold by : <Text style={{ fontWeight: '600' }}>{product.brand}</Text>
        </Text>

        {/* Price and Add to Bag */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.discount}>${product.discountPercentage}</Text>
          </View>
          <TouchableOpacity style={styles.addToBag}>
            <Text style={styles.addToBagText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>

        {/* Highlights */}
        <Text style={styles.sectionTitle}>Highlights</Text>
        <View style={styles.highlightGrid}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Width</Text>
            <Text>{product.dimensions.width}</Text>
          </View>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Height</Text>
            <Text>{product.dimensions.height}</Text>
          </View>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Warranty</Text>
            <Text>{product.warrantyInformation}</Text>
          </View>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>Shipping</Text>
            <Text>{product.shippingInformation}</Text>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
        {product.reviews?.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=' + (index + 5) }}
                style={styles.avatar}
              />

              <View style={{ marginLeft: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const ratingDiff = product.rating - i;

                      let iconName = 'star-o'; // default: empty

                      if (ratingDiff >= 1) {
                        iconName = 'star'; // full
                      } else if (ratingDiff >= 0.5) {
                        iconName = 'star-half-full'; // or 'star-half-alt' if needed
                      }

                      return (
                        <FontAwesome
                          key={i}
                          name={iconName}
                          size={16}
                          color="#000"
                        />
                      );
                    })}
                  </View>
                </View>
                <Text style={styles.email}>{review.reviewerEmail}</Text>
              </View>
            </View>

            <Text style={styles.reviewText}>{review.comment}</Text>
          </View>

        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE4E3',
  },
  headerImageContainer: {
    position: 'relative',
    marginTop: 20,

  },
  productImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 15,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  shareBtn: {
    position: 'absolute',
    top: 20,
    right: 15,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  content: {
    padding: 16,
  },
  viewSimilar: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  viewSimilarText: {
    fontSize: 12,
    color: '#E96E6E',
    fontWeight: 600
  },
  title: {
    fontSize: 25,
    marginVertical: 4,
    fontWeight: 700
  },
  description: {
    fontSize: 15,
    color: '#302d2cff',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingScore: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginVertical: 5
  },
  brand: {
    fontSize: 13,
    color: '#444',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  discount: {
    fontSize: 20,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToBag: {
    backgroundColor: '#CF4C4C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addToBagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightItem: {
    width: '48%',
    marginBottom: 8,
  },
  highlightLabel: {
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  reviewerName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 5
  },
  email: {
    fontSize: 12,
    color: '#666',
  },
  reviewText: {
    fontSize: 13,
    color: '#333',
    marginTop: 4,
  },
});
