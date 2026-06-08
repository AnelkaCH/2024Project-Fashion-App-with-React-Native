import React, { useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = (props) => {
  const { navigation } = props;
 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Drawer');
    }, 3000);
 

    return () => clearTimeout(timer);
  }, []);
 
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/images/splash.png')}
        resizeMode="cover"
      >
        <Image
          style={styles.logo}
          source={require('../../assets/images/splash-text.png')}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '80%',
    height: '40%',
  },
});
 
export default SplashScreen;