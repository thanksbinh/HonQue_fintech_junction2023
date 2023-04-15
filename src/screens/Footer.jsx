import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = ({ navigation, currentTab }) => {
  const [activeTab, setActiveTab] = useState(currentTab);

  const handleTabPress = (tabName) => {
    console.log(navigation)
    setActiveTab(tabName);
    navigation.replace(tabName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => handleTabPress('Home')}
      >
        <Icon name="home" size={32} color={activeTab === 'Home' ? '#E74646' : '#8d99ae'} />
        <Text style={styles.text}>Trang chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => handleTabPress('Deals')}
      >
        <Icon name="tag-heart" size={32} color={activeTab === 'Deals' ? '#E74646' : '#8d99ae'} />
        <Text style={styles.text}>Ưu đãi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => handleTabPress('ChatHome')}
      >
        <Icon name="chat-outline" size={32} color={activeTab === 'ChatHome' ? '#E74646' : '#8d99ae'} />
        <Text style={styles.text}>Hội thoại</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => handleTabPress('Profile')}
      >
        <Icon name="account-outline" size={32} color={activeTab === 'Profile' ? '#E74646' : '#8d99ae'} />
        <Text style={styles.text}>Tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    position: 'fixed',
    bottom: 10,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    boxShadow: "0px -5px 5px #aaa",
    paddingTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#E74646',
  },
  text: {
    fontWeight: 'semibold',
    color: '#8d99ae',
  }
});

export default Footer;
