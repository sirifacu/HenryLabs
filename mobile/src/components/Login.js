import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HenryLogo from '../../android/app/src/main/assets/HenryLogo2.png';
import {Avatar, TextInput, Button, withTheme, HelperText, Portal, Dialog, Paragraph} from 'react-native-paper';
import UserContext from "../context/user/UserContext";
import {validateEmail, validatePass} from './utils'



const Login = () => {
    const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ errorEmail, setErrorEmail ] = useState('');
	const [ errorPass, setErrorPass ] = useState('');
    const { userLogin } = useContext(UserContext);
    
    
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
        <View style={styles.container} >
            <View >
				<Text style={styles.welcome} >BIENVENIDO HENRY</Text>
			</View>
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
            <HelperText type="error" visible={errorEmail}>
              { errorEmail }
            </HelperText>
				<TextInput
                  secureTextEntry
                  mode="outlined"
                  placeholder="Password"
                  style={styles.password}
                  value={password}
                  onChange={handlePasswordChange}
				/>
            <HelperText type="error" visible={errorPass}>
              { errorPass }
            </HelperText>
                <Button
                  style={styles.button}
                  color="black"
                  onPress={handleLogIn}
                  disabled={errorEmail || errorPass && !email || !password}
                >
              Iniciar Sesión
                </Button>
			</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    welcome: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        alignSelf: 'flex-start'
    },
    login: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    email: {
        backgroundColor: "whitesmoke",
        height: 50,
        marginTop: 10,
        width: 300,
        color: 'black'
    },
    password: {
        backgroundColor: "whitesmoke",
        height: 50,
        width: 300,
        color: 'black'
    },
    button: {
        backgroundColor:'yellow',
        width: 300
    },
    dialog: {
        backgroundColor: 'white',
    },
    content:{
        color: 'red',
        fontSize: 14
    },
    logo:{
        backgroundColor: 'white',
        
    }
    
 
});

export default withTheme(Login);
