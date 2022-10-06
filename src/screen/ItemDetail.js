import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ModelView} from 'react-native-3d-model-view';
import Back from '../assests/back.png';
import Chair from '../assests/chair.png';
import MirrorChair from '../assests/mirrorChair.png';
import Star from '../assests/star.png';
import StarFilled from '../assests/starFilled.png';
import {colors} from '../utils/colors';
import {height, hs, ms, vs, width} from '../utils/measures';

const imageGal = [1, 2, 3, 4, 5, 6];

export function ItemDetail({navigation}) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);

  const ItemDetailView = () => {
    return (
      <View style={styles.itemDetailMainContainer}>
        <View style={styles.itemRowContainer}>
          <Text style={styles.itemNameText}>Office Scotch</Text>
          <Text style={[styles.itemNameText, styles.itemPriceText]}>
            $750.00
          </Text>
        </View>
        <View style={styles.ratingViewContainer}>
          <Image source={StarFilled} style={styles.starImgStyle} />
          <Image source={StarFilled} style={styles.starImgStyle} />
          <Image source={StarFilled} style={styles.starImgStyle} />
          <Image source={StarFilled} style={styles.starImgStyle} />
          <Image
            source={Star}
            style={[
              styles.starImgStyle,
              {
                tintColor: colors.blackOp5,
              },
            ]}
          />
          <Text style={styles.ratingTextView}>4.9 {'(50 review)'}</Text>
        </View>
        <View>
          <Text style={styles.descripHeadText}>Description</Text>
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.positionBackView} />
      <SafeAreaView style={styles.container}>
        <ScrollView bounces={false}>
          <View style={styles.headerContainer}>
            <Pressable
              onPress={() => {
                navigation.pop();
              }}>
              <Image source={Back} style={styles.backBtnImg} />
            </Pressable>
          </View>
          <View style={styles.itemImageContainer}>
            {active == 6 ? (
              <View style={styles.mainImgStyle}>
                {/* <RuntimeAssets /> */}
                {!loading ? (
                  <ModelView
                    source={{
                      model:
                        'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car.obj?raw=true',
                      texture:
                        color === 'grey'
                          ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_grey.png?raw=true'
                          : color === 'red'
                          ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_red.png?raw=true'
                          : color === 'blue'
                          ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_blue.png?raw=true'
                          : color === 'yellow'
                          ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_yellow.png?raw=true'
                          : 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color.png?raw=true',
                    }}
                    style={styles.multiDimentionContainer}
                    scale={Platform.OS === 'android' ? 2.5 : 1}
                    // source={{
                    //   model: require('../../res/Chair_without_texture.obj'),
                    //   texture: require('../../res/leather_white_rough_3.png'),
                    // }}
                    // source={{
                    //   model: require('../../res/object_car.obj'),
                    //   texture:
                    //     color === 'grey'
                    //       ? require('../../res/object_car_main_Base_Color_grey.png')
                    //       : color === 'red'
                    //       ? require('../../res/object_car_main_Base_Color_red.png')
                    //       : color === 'blue'
                    //       ? require('../../res/object_car_main_Base_Color_blue.png')
                    //       : color === 'yellow'
                    //       ? require('../../res/object_car_main_Base_Color_yellow.png')
                    //       : require('../../res/object_car_main_Base_Color.png'),
                    // }}
                  />
                ) : (
                  <View
                    style={[
                      styles.multiDimentionContainer,
                      {
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <ActivityIndicator size={'large'} color={colors.blackOp5} />
                  </View>
                )}
              </View>
            ) : (
              <Image
                source={active % 2 == 0 ? Chair : MirrorChair}
                style={styles.mainImgStyle}
              />
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.imageListContainer}>
                {imageGal.map((item, i) => (
                  <Pressable
                    key={i}
                    style={[
                      styles.imageContainer,
                      {
                        borderColor:
                          active == i ? colors.black : colors.blackOp15,
                      },
                    ]}
                    onPress={() => {
                      setActive(i);
                    }}>
                    <Image
                      source={i % 2 == 0 ? Chair : MirrorChair}
                      style={styles.imgStyle}
                    />
                  </Pressable>
                ))}
                {/* <Pressable
                  style={[
                    styles.imageContainer,
                    {
                      borderColor:
                        active == 6 ? colors.black : colors.blackOp15,
                      width: ms(60),
                      height: ms(60),
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => {
                    setActive(6);
                  }}>
                  <Text>3D</Text>
                </Pressable> */}
              </View>
            </ScrollView>
          </View>
          <ItemDetailView />
          {/* <View style={styles.colorMainContainer}>
            <Pressable
              style={[
                styles.colorBorderContainer,
                color === 'grey' ? {borderWidth: 1, borderColor: 'grey'} : {},
              ]}
              onPress={() => {
                setColor('grey');
                if (Platform.OS === 'android') {
                  setLoading(true);
                }
              }}>
              <View
                style={[styles.colorBtnContainer, {backgroundColor: 'grey'}]}>
                {color === 'grey' && (
                  <Image source={Check} style={styles.checkImg} />
                )}
              </View>
            </Pressable>
            <Pressable
              style={[
                styles.colorBorderContainer,
                color === 'red' ? {borderWidth: 1, borderColor: 'red'} : {},
              ]}
              onPress={() => {
                setColor('red');
                if (Platform.OS === 'android') {
                  setLoading(true);
                }
              }}>
              <View
                style={[styles.colorBtnContainer, {backgroundColor: 'red'}]}>
                {color === 'red' && (
                  <Image source={Check} style={styles.checkImg} />
                )}
              </View>
            </Pressable>
            <Pressable
              style={[
                styles.colorBorderContainer,
                color === 'blue' ? {borderWidth: 1, borderColor: 'blue'} : {},
              ]}
              onPress={() => {
                setColor('blue');
                if (Platform.OS === 'android') {
                  setLoading(true);
                }
              }}>
              <View
                style={[styles.colorBtnContainer, {backgroundColor: 'blue'}]}>
                {color === 'blue' && (
                  <Image source={Check} style={styles.checkImg} />
                )}
              </View>
            </Pressable>
            <Pressable
              style={[
                styles.colorBorderContainer,
                color === 'yellow'
                  ? {borderWidth: 1, borderColor: 'yellow'}
                  : {},
              ]}
              onPress={() => {
                setColor('yellow');
                if (Platform.OS === 'android') {
                  setLoading(true);
                }
              }}>
              <View
                style={[styles.colorBtnContainer, {backgroundColor: 'yellow'}]}>
                {color === 'yellow' && (
                  <Image source={Check} style={styles.checkImg} />
                )}
              </View>
            </Pressable>
          </View> */}
          <View style={styles.btnMainContainer}>
            <Pressable
              style={styles.btnContainer}
              onPress={() => {
                navigation.push('ItemArView');
              }}>
              <Text style={styles.btnText}>View in AR</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  positionBackView: {
    position: 'absolute',
    width: width,
    height: (height * 30) / 100,
    backgroundColor: '#E8E8E8',
  },
  backBtnImg: {
    width: ms(30),
    height: ms(30),
    resizeMode: 'contain',
  },
  headerContainer: {
    marginTop: vs(18),
    marginLeft: vs(18),
  },
  itemImageContainer: {
    paddingHorizontal: hs(18),
    alignItems: 'center',
  },
  mainImgStyle: {
    width: width - hs(36),
    height: (width * 65) / 100,
    resizeMode: 'contain',
  },
  imageListContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: ms(8),
    marginHorizontal: hs(6),
  },
  imgStyle: {
    width: ms(60),
    height: ms(60),
    resizeMode: 'contain',
  },
  itemDetailMainContainer: {
    marginHorizontal: hs(18),
    marginVertical: vs(28),
  },
  itemRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemNameText: {
    fontSize: ms(23),
    fontFamily: 'CircularStd-Bold',
    color: colors.black,
  },
  itemPriceText: {
    color: colors.blue,
  },
  ratingViewContainer: {
    flexDirection: 'row',
    marginTop: vs(8),
  },
  starImgStyle: {
    width: ms(17),
    height: ms(17),
    resizeMode: 'contain',
    marginHorizontal: hs(2),
  },
  ratingTextView: {
    fontFamily: 'CircularStd-Medium',
    fontSize: ms(13),
    marginLeft: ms(8),
    color: colors.blackOp5,
  },
  descripHeadText: {
    fontSize: ms(16),
    fontFamily: 'CircularStd-Bold',
    marginTop: ms(22),
  },
  descriptionText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: ms(13),
    color: colors.blackOp5,
    marginTop: ms(5),
  },
  btnMainContainer: {
    alignItems: 'center',
    marginVertical: ms(25),
  },
  btnContainer: {
    width: (width * 65) / 100,
    paddingVertical: vs(15),
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: ms(8),
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: ms(16),
    color: colors.blue,
  },
  colorMainContainer: {
    flexDirection: 'row',
    marginHorizontal: hs(18),
  },
  colorBorderContainer: {
    width: ms(50),
    height: ms(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(8),
    marginHorizontal: ms(4),
  },
  colorBtnContainer: {
    width: ms(43),
    height: ms(43),
    borderRadius: ms(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkImg: {
    width: ms(32),
    height: ms(32),
    resizeMode: 'contain',
  },
  multiDimentionContainer: {
    width: width - hs(36),
    height: (width * 65) / 100,
  },
});
