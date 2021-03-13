import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import {useContext} from "react";
import UserContext from "../context/user/UserContext";
import HenryLogo from "../../android/app/src/main/assets/HenryLogo3.png";



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
                    <Image style={styles.image} source={HenryLogo}/>
                    <Dialog.Content>
                        <Paragraph style={styles.paragraph}>Para poder ingresar debes completar tus datos en la aplicación web</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button style={styles.btnOk} onPress={hideDialog}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default CompleteProfileAlert;

const styles = StyleSheet.create({
    dialog: {
       backgroundColor: '#f9f9f9',
        marginTop: 0
    },
    btnOk:{
        marginRight: '2%',
        marginBottom: '2%',
        backgroundColor: 'green',
        fontWeight: 'bold',
    },
    image:{
        margin: '5%',
        alignSelf: 'center'
    },
    paragraph: {
        marginTop: '2%',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
    
});
