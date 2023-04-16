import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { db } from '../services/firebase';

const MessageCover = ({ docLocation, style }) => {
  const onAccept = () => {
    console.log('Accepted');
    db.doc(docLocation).update({
      is_verified: true
    })
  };

  const onCancel = () => {
    console.log('Cancelled');
    db.doc(docLocation).delete()

    // Todo: send review to chatGPT
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.button} onPress={onAccept}>
        <Text>Lưu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text>Hủy</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  overlay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderBottomLeftRadius: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default MessageCover
