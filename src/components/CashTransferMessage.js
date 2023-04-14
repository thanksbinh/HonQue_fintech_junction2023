import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/CashTransferMessageStyles'
import { useEffect } from 'react';
import { auth, db, firebase } from '../services/firebase';

const CashTransferMessage = ({ title, type, amount, dbLocation }) => {
  const [vote, setVote] = useState(false);

  useEffect(() => {
    db.doc(dbLocation).get().then(doc => {
      if (doc.data().acceptedUsers && doc.data()?.acceptedUsers.includes(auth.currentUser.displayName)) {
        setVote(true)
      }
    })
  }, [])

  const handleVote = () => {
    if (vote) return;

    setVote(true)
    db.doc(dbLocation).update({
      acceptedUsers: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.displayName)
    })

    const batch = db.batch()

    if (type === 'cash-transfer') {
      batch.update(db.doc(dbLocation.split("/messages")[0]), {
        balance: firebase.firestore.FieldValue.increment(-amount)
      })

      batch.update(db.doc(`users/${auth.currentUser.uid}`), {
        balance: firebase.firestore.FieldValue.increment(amount)
      })
    } 
    else if (type === 'cash-transfer-request') {
      batch.update(db.doc(dbLocation.split("/messages")[0]), {
        balance: firebase.firestore.FieldValue.increment(amount)
      })

      batch.update(db.doc(`users/${auth.currentUser.uid}`), {
        balance: firebase.firestore.FieldValue.increment(-amount)
      })
    }

    batch.commit()
  }

  return (
    <View style={styles.container}>
      {type === 'cash-transfer' ?
        <Text style={styles.senderMessage}>Post a Cash Transfer of {amount} VND: </Text>
        : type === 'cash-transfer-request' ?
          <Text style={styles.senderMessage}>Post a Cash Transfer Request of {amount} VND: </Text>
          : null
      }
      <Text style={styles.senderText}>{title}</Text>


      <View style={styles.buttonContainer}>
        {vote ? (
          <Text style={styles.senderMessage}>You have accepted this request</Text>
        ) : (
          <TouchableOpacity
            style={[styles.button, vote && styles.selectedButton]}
            onPress={handleVote}
          >
            <Text style={[styles.buttonText, vote && styles.selectedButtonText]}>Accept</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CashTransferMessage
