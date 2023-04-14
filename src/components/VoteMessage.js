import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/VoteMessageStyles'

const VoteMessage = ({ title }) => {
  const [vote, setVote] = useState(null);

  const handleVote = (selectedVote) => {
    setVote(selectedVote);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, vote === 'Accept' && styles.selectedButton]}
          onPress={() => handleVote('Accept')}
        >
          <Text style={[styles.buttonText, vote === 'Accept' && styles.selectedButtonText]}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, vote === 'Decline' && styles.selectedButton]}
          onPress={() => handleVote('Decline')}
        >
          <Text style={[styles.buttonText, vote === 'Decline' && styles.selectedButtonText]}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VoteMessage
