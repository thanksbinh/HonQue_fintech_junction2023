import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      padding: 10,
      marginHorizontal: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    selectedButton: {
      backgroundColor: '#000',
    },
    selectedButtonText: {
      color: '#fff',
    },
  });