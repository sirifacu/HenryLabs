import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import {useContext} from "react";
import UserContext from "../context/user/UserContext";

const AlertLoginFailed = () => {
    const [visible, setVisible] = React.useState(false);
    const { userLogin, error, resetError } = useContext(UserContext);
    
    const hideDialog = () => setVisible(false);
    
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Actions>
                    <Button onPress={() => resetError()}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AlertLoginFailed;
