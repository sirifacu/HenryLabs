import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {useContext} from "react";
import UserContext from "../context/user/UserContext";


const CompleteProfileAlert = () => {
    const [visible, setVisible] = React.useState(true);
    const { userLogout } = useContext(UserContext);
    
    const hideDialog = () => {
        setVisible(false)
        userLogout()
    };
    
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Hola!</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Para poder usar esta aplicación debes completar tus datos es la aplicación web</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default CompleteProfileAlert;

const styles = StyleSheet.create({
    dialog: {
       backgroundColor: 'gray'
    },
    
    
});
