import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import HenryLogo from '../../../android/app/src/main/assets/HenryLogo1.jpeg';
import appHenry from '../../../android/app/src/main/assets/appHenry.jpg';
import { TextInput, Button, withTheme, HelperText, Avatar, IconButton} from 'react-native-paper';
import UserContext from "../../context/user/UserContext";
import { validateEmail, validatePass } from '../utils'


const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
	  const [ errorEmail, setErrorEmail ] = useState('');
	  const [ errorPass, setErrorPass ] = useState('');
	  const [ securePass, setSecurePass ] = useState(true);
    const { userLogin, error, showAlertError } = useContext(UserContext);
    
    
    if(error){
      showAlertError();
    }
    
    const handleLogIn = event => {
        setEmail(event.nativeEvent.text);
        setPassword(event.nativeEvent.text);
        
        if (!errorEmail && !errorPass) {
            userLogin(email, password)
        }
        setEmail("");
        setPassword("");
    }
    
    const handleEmailChange = (event) =>{
      const email = event.nativeEvent.text;
      setErrorEmail(validateEmail(email));
      setEmail(email)
    }
    
    const handlePasswordChange = (event) =>{
      const pass = event.nativeEvent.text;
      setErrorPass(validatePass(pass));
      setPassword(pass)
    }
    
    const updateSecureTextEntry = () => setSecurePass(!securePass);
    
  return (
    <ImageBackground style={styles.container}  source={appHenry}>
			<View style={styles.login} >
        <Avatar.Image size={100} source={HenryLogo} />
        <Text style={styles.welcome} >Iniciar sesión</Text>
				<TextInput
            mode="flat"
            style={styles.email}
            placeholder="Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onChange={handleEmailChange}
				/>
				
        <HelperText style={styles.helper} type="error" visible={errorEmail}>
          { errorEmail }
        </HelperText>
        <View>
            <TextInput
                secureTextEntry={securePass}
                mode="flat"
                placeholder="Password"
                placeholderTextColor="gray"
                style={styles.password}
                value={password}
                onChange={handlePasswordChange}
            />
            <IconButton
                style={styles.eye}
                icon={ securePass ? "eye-off" : "eye"}
                size={20}
                color='gray'
                onPress={updateSecureTextEntry}
            />
        </View>
        <HelperText style={styles.helper} type="error" visible={errorPass}>
          { errorPass }
        </HelperText>
        <Button
            style={styles.button}
            onPress={handleLogIn}
            disabled={errorEmail || errorPass && !email || !password}>
            <Text style={styles.textButton}>Iniciar Sesión</Text>
        </Button>
			</View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: 'white'
    },
    welcome: {
        marginTop: 10,
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center'
    },
    login: {
        flex: 1,
        marginTop: 170,
        alignItems: 'center',
    },
    email: {
        backgroundColor: 'white',
        height: 50,
        marginTop: 20,
        width: 300,
        color: 'black',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    password: {
        backgroundColor: 'white',
        height: 50,
        width: 300,
        color: 'black',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: '#2e2e2e',
        width: 300,
        color:"white",
        marginTop: 5
    },
    helper:{
        padding: '1%',
        fontSize: 12
    },
    textButton: {
        color: 'white'
    },
    eye: {
        position: 'absolute',
        right: 0,
        bottom: 6,
    },
});

export default withTheme(Login);
