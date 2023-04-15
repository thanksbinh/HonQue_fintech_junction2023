import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import MessageCover from "./MessageCover";
import CashTransferMessage from "./CashTransferMessage";
import { styles } from '../styles/ChatScreenStyles'
import React from 'react'

const MessageReceive = ({ data, messages, index, docLocation, isChatOwner, navigation }) => {
  return (
    <>
      {messages[index - 1]?.data.email !== data.email && (
        <Text style={styles.displayName}>
          {data.displayName} {isChatOwner && "(Owner)"}
        </Text>
      )}
      <View style={styles.containerSender}>
        <Avatar
          rounded
          size={30}
          source={{ uri: (index + 1 === messages.length || messages[index + 1]?.data.email !== data.email) && data.photoURL }}
        />

        <View style={styles.sender}>
          {(!data.is_verified && data.type) && (
            <MessageCover docLocation={docLocation} />
          )}

          {!data.type ? (
            <Text style={styles.senderText}>
              {data.message}
            </Text>
          ) : (
            <CashTransferMessage
              title={data.message}
              type={data.type}
              amount={data.amount}
              dbLocation={docLocation}
              navigation={navigation}
            />
          )}
        </View>
      </View>
    </>
  );
}

export default MessageReceive;