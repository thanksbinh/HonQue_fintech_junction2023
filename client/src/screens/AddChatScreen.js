import React, { useState, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { auth, db } from '../services/firebase'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles/AddChatScreenStyles'
import axios from 'axios'

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState('')

    const createChat = async () => {
        try {
            const chat = await db.collection('chats').add({
                chatName: input,
                owner: {
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                },
                balance: 0,
            })
    
            const id = await axios.post('http://localhost:3001/card')
            const customerGroup = await axios.post('http://localhost:3001/customerGroup', {
                id: chat.id,
                chatOwnerId: auth.currentUser.uid,
                chatName: input,
                cardId: id.data.id
            })
        } catch (error) {
            alert(error.message)
        }

        navigation.goBack()
        Keyboard.dismiss()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Create new chat',
            headerStyle: { backgroundColor: '#FA9884', elevation: 0 },
            headerTintStyle: { color: '#fff' },
            headerTintColor: '#fff',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={30}
                            color="#E74646"
                        />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <TextInput
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.input}
                placeholderTextColor='grey'
            />

            <TouchableOpacity
                disabled={!input}
                style={styles.button}
                onPress={createChat}
            >
                <Text style={styles.buttonText}>CREATE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddChatScreen
