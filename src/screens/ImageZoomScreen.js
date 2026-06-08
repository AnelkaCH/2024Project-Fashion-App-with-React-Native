import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const ImageZoomScreen = (props) => {
  const { route } = props;
  const imageSource = route.params.imagePath;  
  const { width, height } = Dimensions.get('window');
 
  return (
    <View style={styles.container}>
      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={width}   
      >
        <Image
          style={styles.image}
          source={{ uri: imageSource }}
          resizeMode="contain"
        />
      </ImageZoom>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
 
export default ImageZoomScreen;