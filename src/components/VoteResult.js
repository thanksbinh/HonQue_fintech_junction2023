import React from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const VoteResult = ({ acceptedUsers, declinedUsers }) => {

  const totalVotes = acceptedUsers.length + declinedUsers.length;
  const acceptedPercentage = ((acceptedUsers.length / totalVotes) * 100).toFixed(2);
  const declinedPercentage = ((declinedUsers.length / totalVotes) * 100).toFixed(2);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16 }}>Accepted</Text>
        <Text style={{ fontSize: 12 }}>{acceptedPercentage}%</Text>
      </View>
      <ProgressBar progress={acceptedPercentage / 100} color={'green'} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16 }}>Declined</Text>
        <Text style={{ fontSize: 12 }}>{declinedPercentage}%</Text>
      </View>
      <ProgressBar progress={declinedPercentage / 100} color={'red'} />
    </View>
  )
}

export default VoteResult
