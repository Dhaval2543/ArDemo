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
import {colors} from '../utils/colors';
import {jsonData} from '../utils/constants';
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
          {jsonData.map((item, i) => (
            <Pressable
              key={i}
              style={styles.itemTabContainer}
              onPress={() => {
                navigation.push('ItemDetail', {item: i});
              }}>
              <Image source={item.assets[0]} style={styles.tabImage} />
              <View style={styles.contentContainer}>
                <Text style={styles.tabItemNameText}>{item.productName}</Text>
                <Text style={styles.tabItemDescriText}>{item.shorDes}</Text>
              </View>
              <View style={styles.tabItemPriceContainer}>
                <Text style={styles.tabItemSellPriceText}>
                  {item.discountedPrice}
                </Text>
                <Text style={styles.tabItemActualPriceText}>
                  {item.actualPrice}
                </Text>
              </View>
            </Pressable>
          ))}
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
