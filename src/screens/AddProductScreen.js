import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import { InputComponent } from '../components/InputComponent';
import { categoryList } from '../../data/Data';
import realm from '../../store/realm';
 
const EMPTY_PRODUCT = {
  productName: '',
  imagePath: '',
  category: null,
  description: '',
  price: '',
  instagram: '',
  facebook: '',
  phoneNumber: '',
};
 
const AddProductScreen = (props) => {
  const { navigation } = props;
 
  const [productData, setProductData] = useState(EMPTY_PRODUCT);
  const dropdownRef = useRef({});
 
  const onInputChange = (type, value) => {
    setProductData((prev) => ({ ...prev, [type]: value }));
  };
 
  const addImage = () => {
    ImagePicker.openPicker({ width: 2000, height: 2000, cropping: true })
      .then((image) => {
        setProductData((prev) => ({ ...prev, imagePath: image.path }));
      })
      .catch((err) => console.log(err));
  };
 
  const saveData = () => {
    const { productName, imagePath, description, price, category,
            instagram, facebook, phoneNumber } = productData;
 
    if (!productName || !imagePath || !description || !price || category === null) {
      Alert.alert('Error', 'Please fill all product information!');
      return;
    }
    if (!phoneNumber && !instagram && !facebook) {
      Alert.alert('Error', 'Please fill at least one seller contact!');
      return;
    }
 
    const allData = realm.objects('Product');
    const lastId  = allData.length === 0 ? 0 : allData[allData.length - 1].id;
 
    realm.write(() => {
      realm.create('Product', {
        id:          lastId + 1,
        productName,
        imagePath,
        category,
        description,
        price:       parseInt(price) || 0,
        instagram,
        facebook,
        phoneNumber,
      });
    });
 
    Alert.alert('Success', 'Product saved!', [{ text: 'OK' }]);
    setProductData(EMPTY_PRODUCT);
    dropdownRef.current.reset?.();
  };
 
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={addImage}>
            <Image
              style={{
                width:  productData.imagePath !== '' ? wp('50%') : 50,
                height: productData.imagePath !== '' ? wp('50%') : 50,
              }}
              source={{
                uri: productData.imagePath !== ''
                  ? productData.imagePath
                  : 'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png',
              }}
            />
          </TouchableOpacity>
        </View>
 
   
        <View style={styles.row}>
          <InputComponent
            placeholder="Product Name"
            value={productData.productName}
            onChangeText={(t) => onInputChange('productName', t)}
          />
          <SelectDropdown
            data={categoryList}
            defaultButtonText="Category"
            ref={dropdownRef}
            onSelect={(item) => onInputChange('category', item.id)}
            buttonTextAfterSelection={(item) => item.name}
            rowTextForSelection={(item) => item.name}
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
          />
        </View>
 

        <View style={styles.row}>
          <InputComponent
            placeholder="Description"
            value={productData.description}
            onChangeText={(t) => onInputChange('description', t)}
            isDescription={true}
          />
          <InputComponent
            placeholder="Price"
            value={productData.price}
            onChangeText={(t) => onInputChange('price', t)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
            keyboardType="numeric"
          />
        </View>
 

        <Text style={styles.sectionLabel}>Seller Contact</Text>
        <InputComponent
          placeholder="WhatsApp / Phone Number"
          value={productData.phoneNumber}
          onChangeText={(t) => onInputChange('phoneNumber', t)}
          keyboardType="phone-pad"
        />
        <InputComponent
          placeholder="Instagram username"
          value={productData.instagram}
          onChangeText={(t) => onInputChange('instagram', t)}
        />
        <InputComponent
          placeholder="Facebook username"
          value={productData.facebook}
          onChangeText={(t) => onInputChange('facebook', t)}
        />
 

        <TouchableOpacity style={styles.saveBtn} onPress={saveData}>
          <Text style={styles.saveBtnText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: 'white' },
  scroll:       { margin: 8, paddingBottom: 24 },
  imageContainer: { alignItems: 'center', marginVertical: 12 },
  imageButton: {
    width: wp('50%'),
    height: wp('50%'),
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  dropdown: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: wp('40%'),
    height: hp('4%'),
    marginLeft: 8,
  },
  dropdownText: { fontSize: hp('1.5%') },
  sectionLabel: { marginLeft: 8, marginTop: 12, fontWeight: 'bold', fontSize: 14 },
  saveBtn: {
    backgroundColor: '#D1E5C2',
    margin: 16,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: { fontWeight: 'bold', fontSize: 16 },
});
 
export default AddProductScreen;