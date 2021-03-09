import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HenryLogo from '../../android/app/src/main/assets/HenryLogo.jpg';
import { Avatar, TextInput, Button } from 'react-native-paper';

const Login = ({ navigation }) => {
    const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

    const handleLogIn = e => {
        console.log("DATOS: ", email,"PASSWORD: " , password);
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container} >
            <View  >
				<Text style={styles.welcome} >BIENVENIDO HENRY</Text>
			</View>
			<View style={styles.login} >
				  <Avatar.Image source={HenryLogo}  />
				<TextInput
          mode="outlined"
          style={styles.email}
          placeholder="Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
          secureTextEntry
          mode="outlined"
          placeholder="Password"
          style={styles.password}
					value={password}
					onChangeText={text => setPassword(text)}
				/>
          <Button
              style={styles.button}
              color="black"
              onPress={handleLogIn}
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
        marginTop: 150,
        alignItems: 'center',
    },
    email: {
        backgroundColor: "whitesmoke",
        height: 50,
        marginTop: 30,
        width: 300,
        color: 'black'
    },
    password: {
        backgroundColor: "whitesmoke",
        height: 50,
        marginTop: 10,
        width: 300,
        color: 'black'
    },
    button: {
        marginTop: 10,
        backgroundColor:'yellow',
        width: 300
    },
 
});

export default Login;
