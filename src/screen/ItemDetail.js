import React, {useState} from 'react';
import {
  Image,
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
import Check from '../assests/check.png';
import MirrorChair from '../assests/mirrorChair.png';
import Star from '../assests/star.png';
import StarFilled from '../assests/starFilled.png';
import {colors} from '../utils/colors';
import {height, hs, ms, vs, width} from '../utils/measures';

const imageGal = [1, 2, 3, 4, 5, 6];

export function ItemDetail({navigation}) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(null);

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
                <ModelView
                  // source={{
                  //   model: require('../../res/Hamburger.obj'),
                  //   texture: require('../../res/Hamburger.png'),
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
                  source={{
                    zip: require('../../res/chair.zip'),
                  }}
                  style={styles.mainImgStyle}
                  // onLoadModelStart={this.onLoadModelStart}
                  // onLoadModelSuccess={this.onLoadModelSuccess}
                  // onLoadModelError={this.onLoadModelError}
                />
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
                <Pressable
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
                  <Text>360°</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
          <ItemDetailView />
          <View style={styles.colorMainContainer}>
            <Pressable
              style={[
                styles.colorBorderContainer,
                color === 'grey' ? {borderWidth: 1, borderColor: 'grey'} : {},
              ]}
              onPress={() => {
                setColor('grey');
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
              }}>
              <View
                style={[styles.colorBtnContainer, {backgroundColor: 'yellow'}]}>
                {color === 'yellow' && (
                  <Image source={Check} style={styles.checkImg} />
                )}
              </View>
            </Pressable>
          </View>
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
    color: colors.red,
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
    borderColor: colors.red,
    borderRadius: ms(8),
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: ms(16),
    color: colors.red,
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
});
