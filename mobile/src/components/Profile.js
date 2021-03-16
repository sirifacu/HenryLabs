import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import {Avatar, Caption, Title} from 'react-native-paper';
import HenryLogo from '../../android/app/src/main/assets/HenryLogo4.png';
import UserContext from "../context/user/UserContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconLocation from 'react-native-vector-icons/MaterialIcons'

const Profile = () => {
  const { userLoggedIn } = useContext(UserContext);
  
 
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.infoSectionHeader}>
          <Avatar.Image style={styles.avatar} size={80} source={HenryLogo} />
          <View style={{marginLeft: 20}}>
            <Title style={styles.title}>{`${userLoggedIn.firstName} ${userLoggedIn.lastName}`}</Title>
            <Caption style={styles.caption}>{userLoggedIn.email}</Caption>
          </View>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.infoItems}>
            <Icon name="email-outline" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Email: {userLoggedIn.email}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="cake" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Fecha de Nac.: {'25/03/1990'}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="earth" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Pais: {'Argentina'}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="map-marker" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Provincia: {'Buenos Aires'}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="city" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Ciudad: {'Buenos aires'}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="home" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Dirección: {'Malabia 458'}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="cellphone-android" style={styles.icons} />
            <Text style={{marginLeft: 10}} >Teléfono: {1334567895}</Text>
          </View>
        
        </View>
        
      </View>
      
      <Text>Page content</Text>
    </SafeAreaView>
  );
}


export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  avatar:{
    marginLeft: 20,
    backgroundColor: 'gray',
  },
  title: {
    marginTop:15,
    color: 'black'
},
  caption:{
    color: 'gray'
  },
  infoSection: {
    marginTop: 20,
    marginLeft: 15
  },
  infoSectionHeader: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 15
  },
  infoItems: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icons: {
    color: '#2e2e2e',
    fontSize: 15
  }
});
