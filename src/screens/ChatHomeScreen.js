import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../services/firebase'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles/HomeScreenStyles'
import Footer from './Footer'

const ChatHomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Messages',
            headerStyle: { backgroundColor: '#FA9884', elevation: 0 },
            headerTintStyle: { color: '#fff' },
            headerTintColor: '#fff',
            headerLeft: () => (<View />),
            headerRight: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Ionicons
                            name='exit-outline'
                            size={25}
                            color='#FFF'
                            style={{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName
        })
    }

    return (
        <SafeAreaView>
            <StatusBar style="light" />

            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        id={id}
                        chatName={chatName}
                        key={id}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.buttonAddChat}
                onPress={() => navigation.navigate('AddChat')}
            >
                <Ionicons
                    name='add'
                    size={30}
                    color='#fff'
                    style={{ marginLeft: 3 }}
                />
            </TouchableOpacity>

            <Footer navigation={navigation} currentTab={"ChatHome"}/>
        </SafeAreaView>
    )
}

export default ChatHomeScreen
