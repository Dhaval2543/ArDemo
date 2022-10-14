import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  NativeModules,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ModelView} from 'react-native-3d-model-view';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import Back from '../assests/back.png';
import Chair1 from '../assests/chair1.png';
import Chair2 from '../assests/chair2.png';
import Chair3 from '../assests/chair3.png';
import Chair4 from '../assests/chair4.png';
import Sofa1 from '../assests/leather_couch_1.png';
import Sofa2 from '../assests/leather_couch_2.png';
import Sofa3 from '../assests/leather_couch_3.png';
import Sofa4 from '../assests/leather_couch_4.png';
import {colors} from '../utils/colors';
import {jsonData} from '../utils/constants';
import {height, hs, ms, vs, width} from '../utils/measures';

export function ItemDetail({navigation, route}) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const ItemDetailView = () => {
    return (
      <View style={styles.itemDetailMainContainer}>
        <View style={styles.itemRowContainer}>
          {product != null && (
            <Text style={styles.itemNameText}>{product.productName}</Text>
          )}
          {product != null && (
            <Text style={[styles.itemNameText, styles.itemPriceText]}>
              {product.discountedPrice}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.descripHeadText}>Description</Text>
          {product != null && (
            <Text style={styles.descriptionText}>{product.description}</Text>
          )}
        </View>
      </View>
    );
  };

  // useEffect(() => {
  //   setLoading(false);
  // }, [loading]);

  useEffect(() => {
    const {params} = route;
    if (params != undefined) {
      let productData = jsonData[params.item];
      setProduct(productData);
    }
  }, []);

  const loadPath = async item => {
    setLoading(true);
    const iosUrl = product.iosObject;
    const androidUrl = product.androidObject;
    const modelSrc = Platform.OS === 'android' ? androidUrl : iosUrl;
    const modelPath = `${RNFS.DocumentDirectoryPath}/${
      item == 0 ? 'Office_Chair' : 'Leather_couch'
    }.${Platform.OS === 'android' ? 'glb' : 'usdz'}`;
    const exists = await RNFS.exists(modelPath);
    // if (!exists) {
    RNFS.downloadFile({
      fromUrl: modelSrc,
      toFile: modelPath,
    })
      .promise.then(() => {
        setLoading(false);
        FileViewer.open(modelPath).catch(err => {
          setLoading(false);
        });
      })
      .catch(err => {
        setLoading(false);
      });
    // }
  };
  const {params} = route;
  const imageGal =
    params.item == 0
      ? [Chair1, Chair2, Chair3, Chair4]
      : [Sofa1, Sofa2, Sofa3, Sofa4];
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
                    // source={{
                    //   model:
                    //     'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car.obj?raw=true',
                    //   texture:
                    //     color === 'grey'
                    //       ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_grey.png?raw=true'
                    //       : color === 'red'
                    //       ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_red.png?raw=true'
                    //       : color === 'blue'
                    //       ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_blue.png?raw=true'
                    //       : color === 'yellow'
                    //       ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color_yellow.png?raw=true'
                    //       : 'https://github.com/Dhaval2543/ArDemo/blob/main/res/object_car_main_Base_Color.png?raw=true',
                    // }}
                    style={styles.multiDimentionContainer}
                    scale={Platform.OS === 'android' ? 2.5 : 1}
                    source={{
                      model: require('../../res/Gramophone_texture.obj'),
                      texture: require('../../res/gramophone_color_2.png'),
                    }}
                    // source={{
                    //   model: require('../../res/converse_obj.obj'),
                    //   texture: require('../../res/converse.jpg'),
                    // }}
                    // source={{
                    //   model: require('../../res/converse_obj.obj'),
                    //   texture: require('../../res/converse.jpg'),
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
              product != null && (
                <Image
                  source={product.assets[active]}
                  style={styles.mainImgStyle}
                />
              )
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.imageListContainer}>
                {product != null &&
                  product.assets.map((item, i) => (
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
                      <Image source={item} style={styles.imgStyle} />
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
          <ItemDetailView item={params.item} />
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
                // navigation.push('ItemArView', {item: params.item});
                if (product != null) {
                  if (Platform.OS === 'ios') {
                    loadPath();
                  } else {
                    // navigation.push('ItemArView', {item: params.item});
                    const {ArViewerModule} = NativeModules;
                    const modelUrl = product.androidObject;
                    ArViewerModule.openViewer(modelUrl, 'AR Viewer');
                  }
                }
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color={colors.blue} />
              ) : (
                <Text style={styles.btnText}>View in AR</Text>
              )}
            </Pressable>
            <Pressable
              style={[styles.btnContainer, {backgroundColor: colors.blue}]}
              onPress={() => {
                navigation.push('Contact');
              }}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: colors.white,
                  },
                ]}>
                Contact us
              </Text>
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
    marginHorizontal: hs(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    width: ((width - hs(36)) * 48.5) / 100,
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
