import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import React, { useState } from 'react'
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../services/firebase'
import { styles } from '../styles/ChatScreenStyles'
import { formatNumber } from '../utils/format'
import SmallForm from './SmallForm';

const ChatScreenFooter = ({ id, isChatOwner }) => {

  const [input, setInput] = useState('')
  const [manualMenu, setManualMenu] = useState('')

  const sendMessage = async () => {
    Keyboard.dismiss()

    await db.collection('chats').doc(id).collection('messages').add({
      timestamp: new Date(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('')

    const answer = await axios.get('http://localhost:3001/ask', {
      params: { question: input }
    }).then(res => res.data.answer)

    const answerId = answer.includes('Đáp án: A') ? "A" : answer.includes('Đáp án: B') ? "B" : "C";
    const amount = answer.includes('Số tiền: ') ? answer.split('Số tiền: ')[1].split(' ')[0] : 0;

    if (!amount || answerId === "A") return;
    if (answerId === "B") {
      sendFundCollection(amount)
    } else {
      sendNewExpense(amount)
    }
  }

  const sendFundCollection = async (amount, sender) => {
    await db.collection('chats').doc(id).collection('messages').add({
      timestamp: new Date(),
      message: auth.currentUser.displayName + ' đang yêu cầu chuyển tiền: ' + formatNumber(amount) + " đ",
      displayName: "Thủ quỹ ảo",
      photoURL: "https://lh3.googleusercontent.com/a/AGNmyxbqS6Pkisg45w-MsosbL_4d1Fyn2EhbIh5zhqNWhg=s96-c",
      type: 'cash-transfer-request',
      amount: amount,
      is_verified: !!sender
    })
  }

  const sendNewExpense = async (amount, sender) => {
    await db.collection('chats').doc(id).collection('messages').add({
      timestamp: new Date(),
      message: auth.currentUser.displayName + ' đang tạo vote: ' + formatNumber(amount) + " đ",
      displayName: "Thủ quỹ ảo",
      photoURL: "https://lh3.googleusercontent.com/a/AGNmyxbqS6Pkisg45w-MsosbL_4d1Fyn2EhbIh5zhqNWhg=s96-c",
      type: 'cash-transfer',
      amount: amount,
      is_verified: !!sender
    })
  }

  return (
    <>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonSendMessage}
          activeOpacity={0.5}
          onPress={() => setManualMenu(manualMenu ? "" : "menu")}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color="#E74646"
          />
        </TouchableOpacity>

        <TextInput
          placeholder='Message'
          style={styles.textInput}
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="gray"
        />

        <TouchableOpacity
          style={styles.buttonSendMessage}
          activeOpacity={0.5}
          onPress={sendMessage}
        >
          <Ionicons
            name='send'
            size={20}
            color='#E74646'
          />
        </TouchableOpacity>
      </View>

      {(manualMenu && isChatOwner) && (
        <View style={[styles.manualMenu]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setManualMenu("fund-collection")}>
              <FontAwesome
                name="cloud-upload"
                size={20}
                color="#FFF"
              />
              <Text style={styles.buttonText}>Thu tiền quỹ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setManualMenu("new-expense")}>
              <FontAwesome
                name="cloud-download"
                size={20}
                color="#FFF"
              />
              <Text style={styles.buttonText}>Khoản chi tiêu mới</Text>
            </TouchableOpacity>
          </View>

          {manualMenu === "fund-collection" ? (
            <SmallForm onClose={() => setManualMenu("menu")} type={"fund-collection"} submitFunc={sendFundCollection}/>
          ) : manualMenu === "new-expense" ? (
            <SmallForm onClose={() => setManualMenu("menu")} type={"new-expense"} submitFunc={sendNewExpense}/>
          ) : null
          }

        </View>
      )}
    </>
  )
}

export default ChatScreenFooter