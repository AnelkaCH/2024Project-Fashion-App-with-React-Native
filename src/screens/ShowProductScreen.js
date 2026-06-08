import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import { MediaComponent } from '../components/MediaComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import realm from '../../store/realm';
 
const ShowProductScreen = (props) => {
  const { route, navigation } = props;
  const category = route.params.categoryId;
 
  const [data, setData]       = useState([]);
  const [isBuy, setIsBuy]     = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [contact, setContact] = useState({ phoneNumber: '', instagram: '', facebook: '' });
 
  const collectData = () => {
    const allData  = realm.objects('Product').filtered(`category = ${category}`);
    const withFlag = allData.map((item) => ({ ...item, checkedStatus: false }));
    setData(Array.from(withFlag));
  };
 
  useEffect(() => {
    const unsub = navigation.addListener('focus', collectData);
    return unsub;
  }, [navigation]);
 

  const buyProduct = (phone, ig, fb) => {
    setContact({ phoneNumber: phone, instagram: ig, facebook: fb });
    setIsBuy(true);
  };
 
  const onClickMedia = (type) => {
    if (type === 'whatsapp')  Linking.openURL(`https://wa.me/${contact.phoneNumber}`);
    if (type === 'instagram') Linking.openURL(`https://www.instagram.com/${contact.instagram}`);
    if (type === 'facebook')  Linking.openURL(`https://m.me/${contact.facebook}`);
  };
 
 
  const setCheckBox = (id, status) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checkedStatus: !status } : item
      )
    );
  };
 
  const onCancel = () => {
    setData((prev) => prev.map((i) => ({ ...i, checkedStatus: false })));
    setIsRemove(false);
  };
 
  const onDelete = () => {
    const checkedIds = data.filter((i) => i.checkedStatus).map((i) => i.id);
    if (checkedIds.length === 0) { alert('Nothing to remove!'); return; }
 
    realm.write(() => {
      checkedIds.forEach((id) => {
        const toDelete = realm.objects('Product').filtered(`id = ${id}`);
        realm.delete(toDelete);
      });
    });
    alert('Successfully removed!');
    setIsRemove(false);
    collectData();
  };
 
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No items.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              !isRemove &&
              navigation.navigate('EditProduct', { idProduct: item.id })
            }
            onLongPress={() => setIsRemove(true)}
          >

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ImageZoom', { imagePath: item.imagePath })
              }
            >
              <Image style={styles.productImage} source={{ uri: item.imagePath }} />
            </TouchableOpacity>
 

            <View style={styles.info}>
              <Text style={styles.title}>{item.productName}</Text>
              <Text style={styles.text}>{item.description}</Text>
              <Text style={styles.text}>$ {item.price}</Text>
            </View>
 

            {isRemove ? (
              <CheckBox
                size={30}
                containerStyle={styles.checkBox}
                checked={item.checkedStatus}
                onPress={() => setCheckBox(item.id, item.checkedStatus)}
              />
            ) : (
              <TouchableOpacity
                onPress={() => buyProduct(item.phoneNumber, item.instagram, item.facebook)}
              >
                <Icon name="shoppingcart" type="antdesign" size={30} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
 

      {isBuy && (
        <View style={styles.modalContainer}>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setIsBuy(false)}
            >
              <Icon name="close" type="antdesign" size={18} />
            </TouchableOpacity>
            <Text style={[styles.title, { marginTop: 32, marginBottom: 8 }]}>
              Contact the seller through:
            </Text>
            {contact.phoneNumber !== '' && (
              <MediaComponent
                source={require('../../assets/images/whatsapp.png')}
                value={contact.phoneNumber}
                onPress={() => onClickMedia('whatsapp')}
              />
            )}
            {contact.instagram !== '' && (
              <MediaComponent
                source={require('../../assets/images/instagram.png')}
                value={contact.instagram}
                onPress={() => onClickMedia('instagram')}
              />
            )}
            {contact.facebook !== '' && (
              <MediaComponent
                source={require('../../assets/images/facebook.png')}
                value={contact.facebook}
                onPress={() => onClickMedia('facebook')}
              />
            )}
          </View>
        </View>
      )}
 

      {isRemove && (
        <View style={styles.deleteBar}>
          <ButtonComponent
            backgroundColor="red"
            title="Delete"
            onPress={onDelete}
          />
          <ButtonComponent
            backgroundColor="green"
            title="Cancel"
            onPress={onCancel}
          />
        </View>
      )}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: 'white' },
  list:       { padding: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    padding: 16,
    borderColor: '#7CAF58',
    borderWidth: 1,
    borderRadius: 10,
  },
  productImage: { width: wp('25%'), height: wp('25%'), borderRadius: 8 },
  info:   { flex: 1, marginLeft: 16 },
  title:  { fontSize: hp('2.5%'), fontWeight: 'bold', color: 'black' },
  text:   { fontSize: hp('2%'), color: 'black' },
  checkBox: { position: 'absolute', right: 0 },
  empty:  { alignItems: 'center', margin: 20 },

  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', right: 8, top: 8, padding: 8 },
  deleteBar: { flexDirection: 'row', height: hp('7%') },
});
 
export default ShowProductScreen;