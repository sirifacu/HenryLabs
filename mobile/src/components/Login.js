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
				<Avatar.Image 
                    source={HenryLogo}
                />
				<TextInput
                    // label="Email"
                    mode="outlined"
                    style={styles.email}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    keyboardType="email-address"
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
                    // label="Password"
                    mode="outlined"
                    placeholder="Password"
                    style={styles.password}
					value={password}
					onChangeText={text => setPassword(text)}
				/>
                <Button
                    dark
                    style={styles.button}
                    color="yellow"
                    onPress={handleLogIn}
                >
                    Ingresar
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
        marginTop: 70,
        alignItems: 'center'
    },
    email: {
        backgroundColor: "yellow",
        height: 35,
        marginTop: 30,
        width: 200,
        color: 'black'
    },
    password: {
        backgroundColor: "yellow",
        height: 35,
        marginTop: 10,
        width: 200,
        color: 'black'
    },
    button: {
        marginTop: 10,
    }
});

export default Login;
