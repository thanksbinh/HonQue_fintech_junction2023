import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    marginTop: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  section: {
    paddingVertical: 16,
    marginHorizontal: 18,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
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
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
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