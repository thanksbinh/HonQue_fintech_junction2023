import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerTitle: {
        color: '#FFF',
        fontWeight: '700',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFE5CA'
    },
    receiver: {
        padding: 10,
        backgroundColor: '#E74646',
        alignSelf: 'flex-end',
        borderRadius: 6,
        borderBottomRightRadius: 0,
        marginRight: 15,
        marginBottom: 5,
        maxWidth: '80%',
        position: 'relative'
    },
    receiverText: {
        color: '#FFF',
        fontWeight: '500',
    },
    containerSender: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 15
    },
    sender: {
        padding: 10,

        backgroundColor: '#FFF',
        alignSelf: 'flex-start',
        borderRadius: 6,
        borderBottomLeftRadius: 0,
        marginLeft: 5,
        maxWidth: '80%',
        position: 'relative',
    },
    senderText: {
        color: '#36454F',
        fontWeight: '500',
    },
    senderName: {
        fontSize: 10,
        color: 'white'
    },
    buttonSendMessage: {
        backgroundColor: '#FFF',
        width: 45,
        height: 45,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        position: "sticky",
        bottom: 0
    },
    textInput: {
        bottom: 0,
        height: 45,
        flex: 1,
        marginHorizontal: 8,
        borderColor: 'transparent',
        backgroundColor: '#FFF',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 6,
    },
    displayName: {
        color: '#C7C6CD',
        fontWeight: '500',
        paddingLeft: 50,
        fontSize: 10
    },
    balance: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    balanceText: {
        color: '#FFF',
        backgroundColor: '#FA9884',
        width: 'fit-content',
        padding: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
    },
    manualMenu: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        backgroundColor: "#FFF", 
        height: "50%"
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: "fit-content"
    },
    button: {
        backgroundColor: '#E74646',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: "12px",
        flex: 1,
        marginHorizontal: 5,
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: "10px"
    },
    manualMenuOverlay: {
        backgroundColor: "#FFF",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
})