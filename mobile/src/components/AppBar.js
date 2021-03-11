import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
// import {
// 	Header,
// 	LearnMoreLinks,
// 	Colors,
// 	DebugInstructions,
// 	ReloadInstructions,
//   } from 'react-native/Libraries/NewAppScreen';

const AppBar = ({ navigation }) => {

    return (
		<View>
			<Appbar style={styles.bottom}>
				<Appbar.Action
					icon="archive"
					onPress={() => console.log('Pressed archive')}
				/>
				<Appbar.Action icon="mail" onPress={() => navigation.navigate('Lectures')} />
				<Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
				<Appbar.Action
					icon="reader-outline"
					onPress={() => console.log('Pressed delete')}
				/>
				<Appbar.Action 
					icon="bell"
					onPress={() => console.log('Pressed')}
				/>
				<Appbar.Action
					icon="logout"
					onPress={() => navigation.navigate("Login")}
				/>
			</Appbar>
			
		</View>
 	);
}

 const styles = StyleSheet.create({
	bottom: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
	},
	welcome: {
		color: 'white',
		marginTop:60,
		fontSize: 50,
		textAlign: 'center',
	}
 });

export default withTheme(AppBar)


