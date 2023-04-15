import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db, firebase } from '../services/firebase'
import { formatNumber } from '../utils/format'

import { styles } from '../styles/ConfirmScreenStyles'

const ConfirmScreen = ({ navigation, route }) => {
  const avatarUrl = auth.currentUser.photoURL
  const [balance, setBalance] = useState(0)
  const [receiverName, setReceiverName] = useState('')

  useEffect(() => {
    db.doc(`chats/${route.params.receiverId}`)
      .get()
      .then(snapshot => {
        setReceiverName(snapshot.data().chatName)
      })

    db.doc(`users/${auth.currentUser.uid}`)
      .get()
      .then(snapshot => {
        setBalance(snapshot.data().balance)
      })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text style={styles.headerTitle}>
          Xác nhận chuyển tiền
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={navigation.goBack}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color="#FFF"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color="#FFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const onConfirm = async () => {
    const dbLocation = route.params.dbLocation
    const amount = parseFloat(route.params.amount)

    const batch = db.batch()

    batch.update(db.doc(dbLocation.split("/messages")[0]), {
      balance: firebase.firestore.FieldValue.increment(amount)
    })
    batch.update(db.doc(`users/${auth.currentUser.uid}`), {
      balance: firebase.firestore.FieldValue.increment(-amount)
    })

    await batch.commit()
    navigation.replace('Success', {
      amount: amount,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={[styles.section, styles.borderBottom]}>
        <Text style={styles.sectionHeader}>Từ tài khoản</Text>

        <View style={styles.flex}>
          <View style={styles.sectionContent}>
            <View style={styles.avatarContainer}>
              <Avatar
                rounded
                size={50}
                source={{ uri: avatarUrl }}
              />
            </View>
            <View>
              <Text style={styles.sectionHeader}>ViettelPay</Text>
              <Text style={styles.value}>{formatNumber(balance)} đ</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => console.log('Thay doi phuong thuc')}>
            <Text style={styles.buttonText}>Thay đổi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, styles.borderBottom]}>
        <Text style={styles.sectionHeader}>Thông tin giao dịch</Text>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Số tài khoản</Text>
          <Text style={styles.value}>{route.params.receiverId}</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Chủ tài khoản nhận</Text>
          <Text style={styles.value}>{receiverName}</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Nội dung</Text>
          <Text style={styles.value}>Chuyen tien tu Viettel Money</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Số tiền giao dịch</Text>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Số tiền</Text>
          <Text style={styles.value}>{formatNumber(route.params.amount)} đ</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.text}>Phí giao dịch</Text>
          <Text style={styles.value}>0 đ</Text>
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

export default ConfirmScreen
