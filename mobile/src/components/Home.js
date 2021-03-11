import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View,  } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile'

const Tab = createMaterialBottomTabNavigator();

const Home = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Profile', title: 'Perfil', icon: 'account-circle' },
        { key: 'Lectures', title: 'Mis Clases', icon: 'text-box-multiple-outline' },
        { key: 'Jobs', title: 'Trabajos', icon: 'bag-checked' },
    ]);


    return (
        <>
		<View style={styles.container} >
            <View  >
				<Text style={styles.welcome} >BIENVENIDO HENRY</Text>
                <NavigationContainer independent={true}>
                    <Tab.Navigator>
                        <Tab.Screen name="Home" 
                            tabBarIcon="account-circle" 
                            component={Profile} 
                            Options={
                                TabBarIcon={name:"account-circle", color:"black", focused: true}
                            }
                        />
                        <Tab.Screen name="Profile" icon="account-circle" component={Profile} />
                        <Tab.Screen name="Lectures" icon="text-box-multiple-outline" component={Profile} />
                        <Tab.Screen name="Jobs" icon="bag-checked" component={Profile} />
                    </Tab.Navigator>
                </NavigationContainer>
			</View>
        </View>
{/*             <Appbar style={styles.bottom}>
                <Appbar.Action icon="account-circle" size={56} onPress={() => console.log('Perfil')}/> 
                <Appbar.Action icon="text-box-multiple-outline" size={56} onPress={() => navigation.navigate('Lectures')} />
                <Appbar.Action icon="bag-checked" size={56} onPress={() => console.log('Jobs')} /> 
            </Appbar> */}
    </>
 	);
}

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
    bottom: {
        display: "flex",
        justifyContent: 'space-around',
		position: 'absolute',
        height: 80,
		left: 0,
		right: 0,
		bottom: 0,
	},
 });

export default withTheme(Home)