import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'

import { TouchableOpacity } from 'react-native'
import { styles } from '../styles/SuccessScreenStyles'
import { formatNumber } from '../utils/format'

var image = require('../../assets/tick.jpg')
const SuccessScreen = ({ navigation, route }) => {

  const onConfirm = async () => {
    navigation.replace('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.imageContainer}>
        <Image source={image} style={{ width: 180, height: 180 }} />
        <Text style={styles.title}>Chuyển tiền thành công</Text>
        <Text style={styles.amount}>{formatNumber(route?.params?.amount || 100000)}đ</Text>
      </View>

      <View style={[styles.section, styles.borderBottom]}>
        <View style={styles.sectionContent}>
          <Text style={styles.text}>Số tiền chuyển</Text>
          <Text style={styles.value}>{formatNumber(route?.params?.amount || 100000)}</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Chủ tài khoản nhận</Text>
          <Text style={styles.value}>{route?.params?.receiverName || "Le Thanh Binh"}</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Nội dung</Text>
          <Text style={styles.value}>{route?.params?.context || "Chuyen tien tu Viettel Money"}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonConfirm} onPress={onConfirm}>
          <Text style={styles.textConfirm}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SuccessScreen
