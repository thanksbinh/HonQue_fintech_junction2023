import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../services/firebase'
import { styles } from '../styles/ChatScreenStyles'
import CashTransferMessage from '../components/CashTransferMessage'
import axios from 'axios'
import MessageCover from '../components/MessageCover'
import { formatNumber } from '../utils/format'

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [chatOwner, setChatOwner] = useState('')
    const [currentBalance, setCurrentBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const doc = await db.collection('chats').doc(route.params.id).get()
            setChatOwner(doc.data().owner.displayName)
        }

        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .onSnapshot(snapshot => {
                if (snapshot.data().balance) {
                    setCurrentBalance(snapshot.data().balance)
                }
            })

        fetchData()
        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    {route.params.chatName}
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
    }, [navigation, messages])

    const sendMessage = async () => {
        Keyboard.dismiss()

        await db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: new Date(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')

        if (chatOwner != auth.currentUser.displayName) return;

        const answer = await axios.get('http://localhost:3001/ask', {
            params: { question: input }
        }).then(res => res.data.answer)

        if (answer.includes('Đáp án: A')) return;

        await db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: new Date(),
            message: auth.currentUser.displayName + " đang " + (answer.includes('Đáp án: B') ? 'yêu cầu nhận tiền.' : 'tạo vote.') + " " + (answer.includes('Số tiền: ') ? answer.split('Số tiền: ')[1].split(' ')[0] : ""),
            displayName: "ChatGPT",
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png",
            type: answer.includes('Đáp án: B') ? 'cash-transfer-request' : 'cash-transfer',
            amount: answer.includes('Số tiền: ') ? answer.split('Số tiền: ')[1].split(' ')[0] : 0,
            is_verified: false
        })
    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))

        return unsubscribe
    }, [route])

    return (
        <>
            <StatusBar style="light" />

            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View style={styles.balance}>
                            <Text style={styles.balanceText}>Balance: {formatNumber(currentBalance)} đ</Text>
                        </View>
                        <ScrollView contentContainerStyle={{ paddingTop: 15, }}>
                            {messages.map(({ id, data }, index) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Text style={styles.receiverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ) : (data.is_verified || !data.type || auth.currentUser.displayName === chatOwner) ? (
                                    <View key={id}>
                                        {messages[index - 1]?.data.email !== data.email && (
                                            <Text style={styles.displayName}>
                                                {data.displayName} {data.displayName === chatOwner && "(Owner)"}
                                            </Text>
                                        )}
                                        <View style={styles.containerSender}>
                                            <Avatar
                                                rounded
                                                size={30}
                                                source={{ uri: (index + 1 === messages.length || messages[index + 1]?.data.email !== data.email) && data.photoURL }}
                                            />

                                            <View style={styles.sender}>
                                                {(!data.is_verified && data.type) && (
                                                    <MessageCover docLocation={'chats/' + route.params.id + '/messages/' + id} />
                                                )}

                                                {!data.type ? (
                                                    <Text style={styles.senderText}>
                                                        {data.message}
                                                    </Text>
                                                ) : (
                                                    <CashTransferMessage
                                                        title={data.message}
                                                        type={data.type}
                                                        amount={data.amount}
                                                        dbLocation={'chats/' + route.params.id + '/messages/' + id}
                                                        navigation={navigation}
                                                    />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ) : (null)
                            ))}
                        </ScrollView>

                        <View style={styles.footer}>
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
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        </>
    )
}

export default ChatScreen
