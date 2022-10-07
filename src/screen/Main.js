import React from 'react';
import {Image, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import Furniture from '../assests/furniture.png';
import {hs, vs, width} from '../utils/measures';

export function Main({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.push('Home');
        }}>
        <Image source={Furniture} style={styles.posterImg} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: hs(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImg: {
    width: width - hs(36),
    height: (width - hs(36)) * 0.386,
    resizeMode: 'contain',
    marginVertical: vs(8),
  },
});
