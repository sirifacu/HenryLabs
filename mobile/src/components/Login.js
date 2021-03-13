import React, {useState, useContext, useEffect} from 'react';
import { Image, View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import HenryLogo from '../../android/app/src/main/assets/HenryLogo1.jpeg';
import { TextInput, Button, withTheme, HelperText, Avatar} from 'react-native-paper';
import UserContext from "../context/user/UserContext";
import {validateEmail, validatePass} from './utils'

const Login = () => {
    const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ errorEmail, setErrorEmail ] = useState('');
	const [ errorPass, setErrorPass ] = useState('');
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
    
  return (
        <View style={styles.container}>
            {/*<View >*/}
				{/*<Text style={styles.welcome} >BIENVENIDO HENRY</Text>*/}
			{/*</View>*/}
			<View style={styles.login} >
                <Avatar.Image size={100} style={styles.logo} source={HenryLogo} />
				<TextInput
                    mode="outlined"
                    style={styles.email}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    keyboardType="email-address"
                    value={email}
                    onChange={handleEmailChange}
				/>
				
            <HelperText style={styles.helper} type="error" visible={errorEmail}>
              { errorEmail }
            </HelperText>
				<TextInput
                    secureTextEntry
                    mode="outlined"
                    placeholder="Password"
                    placeholderTextColor="grey"
                    style={styles.password}
                    value={password}
                    onChange={handlePasswordChange}
				/>
            <HelperText style={styles.helper} type="error" visible={errorPass}>
              { errorPass }
            </HelperText>
                <Button
                    style={styles.button}
                    
                    onPress={handleLogIn}
                    disabled={errorEmail || errorPass && !email || !password}
                >
              <Text style={styles.textButton}>Iniciar Sesión</Text>
                </Button>
			</View>
        </View>
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
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
        alignSelf: 'flex-start'
    },
    login: {
        flex: 1,
        marginTop: 160,
        alignItems: 'center',
    },
    email: {
        backgroundColor: "white",
        height: 50,
        marginTop: 10,
        width: 300,
        color: 'black'
    },
    password: {
        backgroundColor: "white",
        height: 50,
        width: 300,
        color: 'black'
    },
    button: {
        backgroundColor: '#2e2e2e',
        width: 300,
        color:"white"
    },
    helper:{
        padding: '1%',
        fontSize: 12
    },
    textButton: {
        color: 'white'
    }
    
});

export default withTheme(Login);
