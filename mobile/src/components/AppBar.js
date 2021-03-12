import React, {useEffect, useContext} from 'react';
import {Appbar, Text, withTheme, Avatar} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import UserContext from "../context/user/UserContext";


// import {
// 	Header,
// 	LearnMoreLinks,
// 	Colors,
// 	DebugInstructions,
// 	ReloadInstructions,
//   } from 'react-native/Libraries/NewAppScreen';

const AppBar = ({ navigation }) => {
	const { userLoggedIn, userLogout} = useContext(UserContext)
	console.log("el user de la navbar", userLoggedIn)
	
	const handleLogout =  () => {
		userLogout()
		// navigation.navigate("Home");
	}
	

    return (
		<View>
			<Appbar style={styles.bottom}>
				<Appbar.Action
					icon="archive"
					onPress={() => console.log('Pressed archive')}
				/>
				<Appbar.Action icon="mail" onPress={() => navigation.navigate('Lectures')} />
				<Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
				{/*<Appbar.Action*/}
				{/*	icon="delete"*/}
				{/*	onPress={() => console.log('Pressed delete')}*/}
				{/*/>*/}
				<Appbar.Action
					icon="bell"
					onPress={() => console.log('Pressed')}
				/>
				<Appbar.Action
					icon="logout"
					onPress={handleLogout}
				/>
				
				<Avatar.Icon style={styles.avatar} size={50} icon="account-circle" color="#000"/>
				<Text style={styles.name}> {userLoggedIn.firstName} </Text>
			
			</Appbar>
		</View>
 	);
}

 const styles = StyleSheet.create({
	bottom: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
	},
	welcome: {
		color: 'white',
		marginTop:60,
		fontSize: 50,
		textAlign: 'center',
	},
	 account:{
		flexDirection: "row",
		textAlign: 'right'
	 },
	 name: {
		textAlign: "center"
	 },
	 avatar: {
		marginLeft: 40
	 }
	
 });

export default withTheme(AppBar)
