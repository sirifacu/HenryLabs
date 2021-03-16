import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import Jobs from './screens/Jobs';
import Lectures from './screens/Lectures';

const Tab = createBottomTabNavigator();

const ButtonBar = () => {
  //console.log(route)
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused
                ? 'home-outline'
                : 'home';
            } 
            else if (route.name === 'Trabajos') {
                iconName = focused 
                ? 'newspaper-outline' 
                : 'newspaper';
            }
            else if (route.name === 'Mis Clases') {
                iconName = focused 
                ? 'book-outline' 
                : 'book';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'yellow',
          inactiveTintColor: 'gray',
        }}
      >
            <Tab.Screen name="Inicio" component={Home}
             />
            <Tab.Screen name="Trabajos" component={Jobs} 
            />
            <Tab.Screen name="Mis Clases" component={Lectures} 
            />
        </Tab.Navigator>
    )
}

export default ButtonBar

const styles = StyleSheet.create({})
