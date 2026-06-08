import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import { imageSlider, categoryList } from '../../data/Data';
 
const HomeScreen = (props) => {
  const { navigation } = props;
 
  return (
    <View style={styles.container}>

      <SliderBox
        images={imageSlider}
        autoplay={true}
        circleLoop={true}
        sliderBoxHeight={hp('30%')}
      />
 

      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <FlatList
        data={categoryList}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('ShowProduct', { categoryId: item.id })
            }
          >
            <Image style={styles.categoryIcon} source={{ uri: item.icon }} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: 'white' },
  sectionTitle:  { fontSize: hp('2.5%'), fontWeight: 'bold', margin: 12 },
  grid:          { paddingHorizontal: 8 },
  categoryBtn: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    height: hp('17%'),
    justifyContent: 'center',
  },
  categoryIcon: {
    width: wp('12%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  categoryName: { marginTop: 6, fontSize: hp('1.8%'), textAlign: 'center' },
});
 
export default HomeScreen;