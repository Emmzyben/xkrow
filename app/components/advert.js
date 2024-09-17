import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import useGetAllAdverts from '../hooks/useGetAllAdverts';

const { width: screenWidth } = Dimensions.get('window');

const Advert = () => {
  const { adverts, loading, error } = useGetAllAdverts();

  

  const renderAdvert = ({ item }) => (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={{ uri: item.image_url }}
        style={styles.imageBackground}
      >
     <View style={styles.overlay}>
          <Text style={styles.businessName}>{item.business_name}</Text>
          <Text style={styles.businessType}>{item.business_type}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
      </View>
      </ImageBackground>
    </View>
  );

  return (
    <FlatList
      data={adverts}
      renderItem={renderAdvert}
      keyExtractor={(item) => item.id}
      horizontal // Makes the list horizontal
      pagingEnabled // Enables snapping to each item
      showsHorizontalScrollIndicator={false} // Hides scroll indicator
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 20,height:200,
          width:400
  },
  imageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end', borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(98, 36, 163, 0.178)',
    padding: 10,position:'relative',top:-30,borderRadius:10,
  },
  businessName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  businessType: {
    color: 'white',
    fontSize: 16,
  },
  caption: {
    color: 'white',
    fontSize: 14,
  },
});

export default Advert;
