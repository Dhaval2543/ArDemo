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
import Chair from '../assests/chair.png';
import Sofa from '../assests/sofa.png';
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
        <BillboardView />
        <View style={styles.itemListContainer}>
          <Pressable
            style={styles.itemTabContainer}
            onPress={() => {
              navigation.push('ItemDetail');
            }}>
            <Image source={Chair} style={styles.tabImage} />
            <Text style={styles.tabItemNameText}>Office Scotch</Text>
            <Text style={styles.tabItemDescriText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
            <View style={styles.tabItemPriceContainer}>
              <Text style={styles.tabItemSellPriceText}>$860.00</Text>
              <Text style={styles.tabItemActualPriceText}>$870.00</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.itemTabContainer}
            onPress={() => {
              navigation.push('ItemDetail');
            }}>
            <Image source={Sofa} style={styles.tabImage} />
            <Text style={styles.tabItemNameText}>Office Scotch</Text>
            <Text style={styles.tabItemDescriText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
            <View style={styles.tabItemPriceContainer}>
              <Text style={styles.tabItemSellPriceText}>$860.00</Text>
              <Text style={styles.tabItemActualPriceText}>$870.00</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.itemTabContainer}
            onPress={() => {
              navigation.push('ItemDetail');
            }}>
            <Image source={Chair} style={styles.tabImage} />
            <Text style={styles.tabItemNameText}>Office Scotch</Text>
            <Text style={styles.tabItemDescriText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
            <View style={styles.tabItemPriceContainer}>
              <Text style={styles.tabItemSellPriceText}>$860.00</Text>
              <Text style={styles.tabItemActualPriceText}>$870.00</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.itemTabContainer}
            onPress={() => {
              navigation.push('ItemDetail');
            }}>
            <Image source={Sofa} style={styles.tabImage} />
            <Text style={styles.tabItemNameText}>Office Scotch</Text>
            <Text style={styles.tabItemDescriText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemTabContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: ((width - hs(36)) * 47.5) / 100,
    padding: ms(15),
    marginVertical: vs(8),
  },
  tabImage: {
    width: ((width - hs(36)) * 47.5) / 100 - ms(30),
    height: ((width - hs(36)) * 47.5) / 100 - ms(30),
    resizeMode: 'contain',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(8),
  },
  tabItemSellPriceText: {
    fontSize: ms(16),
    fontWeight: '700',
    fontFamily: 'CircularStd-Bold',
    color: '#EB1D36',
  },
  tabItemActualPriceText: {
    fontSize: ms(13),
    fontFamily: 'CircularStd-Medium',
    color: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-end',
  },
});
