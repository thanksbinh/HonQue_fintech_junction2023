import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, TouchableOpacity, Text, TextInput, Keyboard, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../services/firebase'
import { styles } from '../styles/RegisterScreenStyles'
import axios from 'axios'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [loading, setLoading] = useState(false)

    const register = async () => {
        setLoading(true)

        try {
            const authUser = await auth.createUserWithEmailAndPassword(email, password)
            await authUser.user.updateProfile({
                displayName: name,
                photoURL: imageURL || 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
            })

            console.log(authUser)
            await db.collection("users").doc(authUser.user.uid).set({
                displayName: name,
                email: email,
                imageURL: imageURL || 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
            }, { merge: true })

            const id = await axios.post('http://localhost:3001/card')
            const customer = await axios.post('http://localhost:3001/customer', {
                id: authUser.user.uid,
                displayName: name,
                avatarUrl: imageURL || 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
                email: email,
                phoneNumber: '',
                cardId: id.data.id
            })
        } catch (error) {
            alert(error.message)
        }

        Keyboard.dismiss()
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.containerTexts}>
                <Text style={styles.welcomeTitle}>
                    Create new account
                </Text>
                <Text style={styles.welcomeText}>
                    Please fill in the forms to continue
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Full name"
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                    placeholderTextColor='grey'
                />

                <TextInput
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    placeholderTextColor='grey'
                />

                <TextInput
                    placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    placeholderTextColor='grey'
                />

                <TextInput
                    placeholder="Profile Picture URL (optional)"
                    type="text"
                    value={imageURL}
                    onChangeText={(text) => setImageURL(text)}
                    onSubmitEditing={register}
                    style={styles.input}
                    placeholderTextColor='grey'
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={register}
            >
                <Text style={styles.buttonText}>
                    SIGN UP
                </Text>
            </TouchableOpacity>

            {loading ? <ActivityIndicator size="large" color="#C7C6CD" /> : null}

            <TouchableOpacity
                style={{ position: 'absolute', bottom: 40 }}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={{ color: '#C7C6CD' }}>
                    Have an account? <Text style={{ color: '#E74646', fontWeight: 'bold' }}>Sign In</Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
