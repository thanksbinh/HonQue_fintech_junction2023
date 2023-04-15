import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import ChatScreenFooter from '../components/ChatScreenFooter'
import MessageReceive from '../components/MessageReceive'
import { auth, db } from '../services/firebase'
import { styles } from '../styles/ChatScreenStyles'
import { formatNumber } from '../utils/format'

const ChatScreen = ({ navigation, route }) => {

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
                                    <MessageReceive
                                        data={data}
                                        messages={messages}
                                        index={index}
                                        docLocation={'chats/' + route.params.id + '/messages/' + id}
                                        isChatOwner={data.displayName === chatOwner}
                                        navigation={navigation}
                                    />
                                ) : (null)
                            ))}
                        </ScrollView>

                        <ChatScreenFooter id={route.params.id} isChatOwner={auth.currentUser.displayName === chatOwner}/>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        </>
    )
}

export default ChatScreen
