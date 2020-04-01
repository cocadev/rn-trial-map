import React from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { CText } from '../components/text';
import { COLORS } from '../common/colors';
import { images } from '../common/images';
import Ionicons from 'react-native-vector-icons/Ionicons';

const forgotPasswordScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
          <Ionicons name="ios-arrow-round-back" size={26} />

          <CText title={'Forgot Password'} color={COLORS.title} fontSize={24} lineHeight={36}/>
          <TextInput
            label='Email'
            placeholder={'Email'}
            style={styles.input}
          />
          <TextInput
            label='Password'
            placeholder={'Password'}
            style={styles.input}
          />
          <View style={styles.box}>
            <CText title={'Forgot Password? Reset'} color={COLORS.sky} fontSize={14}/>
            <Image source={images.next} />
          </View>
          <CText title={'First time here? Sign up'} color={COLORS.sky} fontSize={14} marginTop={52}/>
      </SafeAreaView>
    </>
  );
};

export default forgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 30,
    paddingVertical: 83
  },
  input: {
    borderBottomColor: COLORS.dark,
    borderBottomWidth: 2,
    // backgroundColor: 'red',
    marginTop: 29,
    color: '#24272c',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 12
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
})