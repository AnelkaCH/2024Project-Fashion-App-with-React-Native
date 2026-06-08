import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';

export const InputComponent = (props) => {
  const { isDescription, isIcon } = props;
 
  return (
    <View style={styles.container}>
      {isIcon ? (
        <Icon size={20} {...props} containerStyle={styles.iconBox} />
      ) : null}
      <TextInput
        style={[
          styles.input,
          { height: isDescription ? hp('12%') : hp('5%') },
        ]}
        multiline={true}
        textAlignVertical={isDescription ? 'top' : 'center'}
        {...props}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iconBox: { marginRight: 6 },
  input: {
    borderBottomWidth: 1,
    fontSize: hp('2%'),
    width: '100%',
  },
});