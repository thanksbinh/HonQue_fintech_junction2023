import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#36454F',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#36454F',
  },
  selectedButtonText: {
    color: '#fff',
  },
  senderText: {
    fontWeight: '500',
  },
  senderMessage: {
    fontWeight: '500',
    fontStyle: 'italic',
  },
});