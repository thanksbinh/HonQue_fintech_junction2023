import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../services/firebase'
import { styles } from '../styles/ChatScreenStyles'
import CashTransferMessage from '../components/CashTransferMessage'

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [chatOwner, setChatOwner] = useState('')
    const [currentBalance, setCurrentBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const doc = await db.collection('chats').doc(route.params.id).get()
            setChatOwner(doc.data().owner.displayName)
            setCurrentBalance(doc.data().balance)
        }

        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .onSnapshot(snapshot => {
                if (snapshot.data().balance) {
                    console.log(snapshot.data().balance)
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
                        color="#E74646"
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons
                        name="ellipsis-vertical"
                        size={20}
                        color="#E74646"
                        style={{ marginRight: 15 }}
                    />
                </TouchableOpacity>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: new Date(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
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
                            <View><Text>{"Balance: " + currentBalance}</Text></View>
                        </View>
                        <ScrollView contentContainerStyle={{ paddingTop: 15, }}>
                            {messages.map(({ id, data }, index) => (
                                data.email === auth.currentUser.email ?
                                    (
                                        <View key={id} style={styles.reciever}>
                                            <Text style={styles.recieverText}>
                                                {data.message}
                                            </Text>
                                        </View>
                                    )
                                    :
                                    (
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
                                                    source={{ uri: messages[index + 1]?.data.email !== data.email && data.photoURL }}
                                                />

                                                {!data.type ?
                                                    <View
                                                        key={id}
                                                        style={styles.sender}
                                                    >
                                                        <Text style={styles.senderText}>
                                                            {data.message}
                                                        </Text>
                                                    </View> :
                                                    <View
                                                        key={id}
                                                        style={styles.sender}
                                                    >
                                                        <CashTransferMessage
                                                            title={data.message}
                                                            type={data.type}
                                                            amount={data.amount}
                                                            dbLocation={'chats/' + route.params.id + '/messages/' + id}
                                                        />
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                    )
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
            </KeyboardAvoidingView>
        </>
    )
}

export default ChatScreen
