import database from '@react-native-firebase/database';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Back from '../assests/back.png';
import TextareaIcon from '../assests/ic_comment.png';
import Mail from '../assests/ic_email.png';
import User from '../assests/ic_user.png';
import {colors} from '../utils/colors';
import {height, hs, ms, vs, width} from '../utils/measures';

export function Contact({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.HeadTextContainer}>
          <Text style={styles.HeadText}>Contact Us</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.pop();
          }}>
          <Image source={Back} style={styles.backBtnImg} />
        </Pressable>
      </View>
    );
  };

  const setData = async () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (firstName == '') {
      alert('Please Enter First Name');
    } else if (lastName == '') {
      alert('Please Enter Last Name');
    } else if (email == '') {
      alert('Please Enter Email');
    } else if (!regex.test(email)) {
      alert('Please Enter Valid Email');
    } else if (message == '') {
      alert('Please Enter Message');
    } else {
      setLoading(true);
      let dataPath = await DeviceInfo.getUniqueId();
      database()
        .ref(`/${dataPath}`)
        .set({
          name: `${firstName} ${lastName}`,
          email: email,
          message: message,
        })
        .then(() => {
          setLoading(false);
          Alert.alert('Thank you', 'Your information submitted successfully', [
            {
              text: 'Ok',
              onPress: () => {
                navigation.pop();
              },
            },
          ]);
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <View style={styles.inputFormContainer}>
          <View style={styles.inputFieldMainContainer}>
            <Image source={User} style={styles.inputIcon} />
            <TextInput
              placeholder={'First name'}
              style={styles.inputFieldText}
              onChangeText={setFirstName}
              value={firstName}
            />
          </View>
          <View style={styles.inputFieldMainContainer}>
            <Image source={User} style={styles.inputIcon} />
            <TextInput
              placeholder={'Last name'}
              style={styles.inputFieldText}
              onChangeText={setLastName}
              value={lastName}
            />
          </View>
          <View style={styles.inputFieldMainContainer}>
            <Image source={Mail} style={styles.inputIcon} />
            <TextInput
              placeholder={'Email'}
              style={styles.inputFieldText}
              onChangeText={setEmail}
              value={email}
              keyboardType={'email-address'}
            />
          </View>
          <View style={styles.inputFieldMainContainer}>
            {message == '' && (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}> Message</Text>
              </View>
            )}
            <Image source={TextareaIcon} style={styles.inputIcon} />
            <TextInput
              placeholder={''}
              style={[
                styles.inputFieldText,
                {
                  height: (height * 10) / 100,
                  textAlignVertical: 'top',
                },
              ]}
              onChangeText={setMessage}
              value={message}
              multiline
            />
          </View>
        </View>
        <Pressable
          style={styles.btnContainer}
          onPress={setData}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Submit</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: vs(18),
    marginHorizontal: hs(18),
  },
  backBtnImg: {
    width: ms(30),
    height: ms(30),
    resizeMode: 'contain',
  },
  HeadTextContainer: {
    position: 'absolute',
    width: width - hs(36),
    alignItems: 'center',
    height: ms(30),
    justifyContent: 'center',
  },
  HeadText: {
    fontSize: ms(23),
    fontFamily: 'CircularStd-Bold',
    color: colors.black,
  },
  inputFormContainer: {
    marginVertical: vs(18),
    marginHorizontal: hs(18),
  },
  inputFieldMainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D0D3D4',
    padding: ms(13),
    borderRadius: ms(8),
    marginVertical: ms(6),
  },
  inputIcon: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
  },
  inputFieldText: {
    fontFamily: 'CircularStd-Black',
    fontSize: ms(16),
    fontWeight: 'normal',
    marginLeft: ms(10),
    width: (width * 74) / 100,
  },
  placeholderContainer: {
    position: 'absolute',
    left: ms(40),
  },
  placeholderText: {
    fontFamily: 'CircularStd-Black',
    fontSize: ms(16),
    color: '#D0D3D4',
    fontWeight: 'normal',
    top: ms(15),
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: (height * 3) / 100,
    marginHorizontal: hs(18),
  },
  btnContainer: {
    width: ((width - hs(36)) * 48.5) / 100,
    paddingVertical: vs(15),
    backgroundColor: colors.blue,
    borderRadius: ms(8),
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: ms(16),
    color: colors.white,
  },
});
