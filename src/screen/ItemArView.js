import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {ArViewerView} from 'react-native-ar-viewer';
import RNFS from 'react-native-fs';
import Back from '../assests/back.png';
import {colors} from '../utils/colors';
import {hs, ms, vs, width} from '../utils/measures';

export function ItemArView({navigation}) {
  const [localModelPath, setLocalModelPath] = useState('');
  const [showArView, setShowArView] = useState(true);
  const ref = useRef();

  const loadPath = async () => {
    const modelSrc =
      Platform.OS === 'android'
        ? 'https://github.com/Dhaval2543/ArDemo/blob/main/res/Astronaut.glb?raw=true'
        : 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz?raw=true';
    const modelPath = `${RNFS.DocumentDirectoryPath}/model.${
      Platform.OS === 'android' ? 'glb' : 'usdz'
    }`;
    const exists = await RNFS.exists(modelPath);
    // if (!exists) {
    await RNFS.downloadFile({
      fromUrl: modelSrc,
      toFile: modelPath,
    }).promise;
    // }

    setLocalModelPath(modelPath);
  };

  useEffect(() => {
    loadPath();
  }, []);

  const takeSnapshot = () => {
    ref.current?.takeScreenshot().then(async base64Image => {
      const date = new Date();
      const filePath = `${
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.LibraryDirectoryPath
      }/arscreenshot-${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.jpg`;
      await RNFS.writeFile(filePath, base64Image, 'base64');
      console.log('Screenshot written to ' + filePath);
    });
  };

  return (
    <View style={styles.container}>
      {localModelPath && showArView && (
        <ArViewerView
          model={localModelPath}
          style={styles.arView}
          disableInstantPlacement
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          onStarted={() => console.log('started')}
          onEnded={() => console.log('ended')}
          onModelPlaced={() => console.log('model displayed')}
          onModelRemoved={() => console.log('model not visible anymore')}
          ref={ref}
        />
      )}
      {localModelPath == '' && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={colors.white} />
        </View>
      )}
      <SafeAreaView style={styles.headerMainContainer}>
        <Pressable
          style={styles.headerContainer}
          onPress={() => {
            navigation.pop();
          }}>
          <Image source={Back} style={styles.backBtnImg} />
        </Pressable>
      </SafeAreaView>
      <SafeAreaView style={styles.footerMainContainer}>
        <Pressable style={styles.captureBtnContainer} onPress={takeSnapshot}>
          <View style={styles.captureBtnInnerContainer} />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: vs(18),
    marginLeft: hs(18),
  },
  backBtnImg: {
    width: ms(30),
    height: ms(30),
    resizeMode: 'contain',
  },
  arView: {
    flex: 2,
  },
  headerMainContainer: {
    position: 'absolute',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.blackOp5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerMainContainer: {
    position: 'absolute',
    bottom: ms(15),
    alignItems: 'center',
    width: width,
  },
  captureBtnContainer: {
    borderWidth: 2,
    borderColor: colors.white,
    padding: ms(5),
    borderRadius: ms(40),
  },
  captureBtnInnerContainer: {
    width: ms(50),
    height: ms(50),
    backgroundColor: colors.white,
    borderRadius: ms(30),
  },
});
