import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Furniture from '../assests/furniture.png';
import WallFrame from '../assests/wallFrame.png';
import Watch from '../assests/watch.png';
import {hs, vs, width} from '../utils/measures';

export function Main({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <Pressable
          onPress={() => {
            navigation.push('Home');
          }}>
          <Image source={Furniture} style={styles.posterImg} />
        </Pressable>

        <Pressable>
          <Image source={WallFrame} style={styles.posterImg} />
        </Pressable>

        <Pressable>
          <Image source={Watch} style={styles.posterImg} />
        </Pressable>

        <Pressable>
          <Image source={WallFrame} style={styles.posterImg} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: hs(18),
  },
  posterImg: {
    width: width - hs(36),
    height: (width - hs(36)) * 0.386,
    resizeMode: 'contain',
    marginVertical: vs(8),
  },
});
