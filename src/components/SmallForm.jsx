import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';

const SmallForm = ({ onClose, type, submitFunc }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const onSubmit = () => {
    console.log(title, amount, deadline, receiverId)
    submitFunc(amount, auth.currentUser.displayName)
    onClose()
  } 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {type === "fund-collection" ? (
          <>
            <Text style={styles.label}>Deadline:</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              value={deadline}
              onChangeText={setDeadline}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Receiver:</Text>
            <TextInput
              style={styles.input}
              value={receiverId}
              onChangeText={setReceiverId}
            />
          </>
        )}
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#E74646',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SmallForm;