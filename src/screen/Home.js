import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Billboard from '../assests/billBoard.png';
import Chair from '../assests/chair1.png';
import Sofa from '../assests/leather_couch_1.png';
import {colors} from '../utils/colors';
import {hs, ms, vs, width} from '../utils/measures';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>AR Furniture</Text>
    </View>
  );
};

const BillboardView = () => {
  return (
    <View style={styles.billboardContainer}>
      <Image source={Billboard} style={styles.billboardImg} />
    </View>
  );
};

export function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.container} bounces={false}>
        {/* <BillboardView /> */}
        <View style={styles.itemListContainer}>
          <Pressable
            style={styles.itemTabContainer}
            onPress={() => {
              navigation.push('ItemDetail', {item: 0});
            }}>
            <Image source={Chair} style={styles.tabImage} />
            <View style={styles.contentContainer}>
              <Text style={styles.tabItemNameText}>Wooden sofa</Text>
              <Text style={styles.tabItemDescriText}>
                The product has a breathable mesh which allows air to circulate
                and and keep you cool.
              </Text>
            </View>
            <View style={styles.tabItemPriceContainer}>
              <Text style={styles.tabItemSellPriceText}>$860.00</Text>
              <Text style={styles.tabItemActualPriceText}>$870.00</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.itemTabContainer}
            onPress={() => {
              navigation.push('ItemDetail', {item: 1});
            }}>
            <Image source={Sofa} style={styles.tabImage} />
            <View style={styles.contentContainer}>
              <Text style={styles.tabItemNameText}>Wooden sofa</Text>
              <Text style={styles.tabItemDescriText}>
                This sofas are made to be comfortable as possible and come with
                a brooder arms with removable cousins
              </Text>
            </View>
            <View style={styles.tabItemPriceContainer}>
              <Text style={styles.tabItemSellPriceText}>$860.00</Text>
              <Text style={styles.tabItemActualPriceText}>$870.00</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: width,
    alignItems: 'center',
    marginVertical: vs(12),
  },
  headerText: {
    fontSize: ms(24),
    fontFamily: 'CircularStd-Bold',
  },
  billboardContainer: {
    marginHorizontal: hs(18),
  },
  billboardImg: {
    width: width - hs(36),
    height: (width - hs(36)) / 1.75,
    resizeMode: 'contain',
  },
  itemListContainer: {
    paddingHorizontal: hs(18),
    paddingVertical: vs(18),
  },
  itemTabContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: width - hs(36),
    padding: ms(15),
    marginVertical: vs(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabImage: {
    width: ms(60),
    height: ms(60),
    resizeMode: 'contain',
  },
  contentContainer: {
    marginLeft: ms(10),
    width: (width * 45) / 100,
  },
  tabItemNameText: {
    fontSize: ms(14),
    fontFamily: 'CircularStd-Bold',
  },
  tabItemDescriText: {
    fontSize: ms(10),
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'CircularStd-Medium',
    marginTop: vs(8),
  },
  tabItemPriceContainer: {
    marginTop: vs(8),
    width: (width * 19) / 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tabItemSellPriceText: {
    fontSize: ms(16),
    fontWeight: '700',
    fontFamily: 'CircularStd-Bold',
    color: colors.blue,
  },
  tabItemActualPriceText: {
    fontSize: ms(13),
    fontFamily: 'CircularStd-Medium',
    color: 'rgba(0,0,0,0.5)',
  },
});
