import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  section: {
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#E74646',
    borderRadius: "24px",
    borderWidth: 1,
  },
  buttonText: {
    color: '#E74646',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginRight: 8,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  buttonConfirm: {
    backgroundColor: '#E74646', 
    borderRadius: "24px",
    padding: 10,
    textAlign: 'center',
  },
  textConfirm: {
    color: '#FFF',
    fontSize: 20,
  },
  footer: {
    height: 64,
    position: 'fixed',
    bottom: 10,
    left: 0,
    right: 0,
    boxShadow: "0px -5px 5px #aaa",
    padding: 10,
  },
});