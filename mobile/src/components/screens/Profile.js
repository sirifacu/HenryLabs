import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Avatar, Caption, Title, IconButton, Text, Button } from 'react-native-paper';
import UserContext from "../../context/user/UserContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from "axios";
import Moment from "moment";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Profile = ( { navigation } ) => {
  const { userLoggedIn, token, userLogout, migration } = useContext(UserContext);
  const [ user, setUser ] = useState({});
  const [ cohort, setCohort ] = useState({});
  const [ cohortError, setCohortError ] = useState('');

  const getUser = (userId) => {
    return axios.get(`/users/${userId}`, { headers: {'Authorization': 'Bearer ' + token }})
      .then(res => setUser(res.data))
      .catch(e => console.log(e))
  };
  
  const getInfoUserCohort = (userId) => {
    return axios.get(`/users/infoCohort/${userId}`, { headers: {'Authorization': 'Bearer ' + token }})
      .then(res => {
        if(!res.data.message){
          setCohort(res.data.cohorts[0]);
        } else {
          setCohortError(res.data.message)
        }
      })
      .catch(err => console.log(err));
  };
  
  useEffect(() => {
    getUser(userLoggedIn.id)
    getInfoUserCohort(userLoggedIn.id)
  }, []);
  
  
  function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YYYY')
  };
  
 
  return (
    <View style={styles.container}>
        <View style={styles.infoSectionHeader}>
          <View>
            <Avatar.Image style={styles.avatar} size={70} source={{uri: user.avatar}} />
            <IconButton
              style={styles.imageEdit}
              icon="pencil"
              color='#47484C'
              size={18}
              onPress={''}
            />
          </View>
          <Title style={styles.name}>{`${user.firstName} ${user.lastName}`}</Title>
          <View style={styles.infoItems}>
            <Icon name="github" style={styles.icons} />
            <Caption style={styles.caption}>{user.githubUser}</Caption>
          </View>
        </View>
      
        <View style={styles.infoSection}>
          <View style={styles.ctnTitleInfo}>
            <Title style={styles.titleInfo}>Información Personal</Title>
            <IconButton
              icon="account-edit-outline"
              color='white'
              size={25}
              onPress={() => navigation.navigate('UpdateProfile')}
            />
          </View>
          <View style={styles.infoItems}>
            <Icon name="email-outline" style={styles.icons} />
            <Text style={styles.textInfo} >{user.email}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="cake" style={styles.icons} />
            <Text style={styles.textInfo} >{formatDate(user.dateOfBirth)}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="earth" style={styles.icons} />
            <Text style={styles.textInfo} >{user.country}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="map-marker" style={styles.icons} />
            <Text style={styles.textInfo} >{user.state}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="city" style={styles.icons} />
            <Text style={styles.textInfo} >{user.city}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="home" style={styles.icons} />
            <Text style={styles.textInfo} >{user.address}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="cellphone-android" style={styles.icons} />
            <Text style={styles.textInfo} >{user.cellphone}</Text>
          </View>
          <View style={{flexDirection:'row', alignSelf: 'center'}}>
            <IconButton
              icon="github"
              color='white'
              size={30}
              onPress={()=> Linking.openURL(`https://github.com/${user.githubUser}`)}
            />
            <IconButton
              icon="linkedin"
              color='white'
              size={30}
              onPress={()=> Linking.openURL(`https://www.linkedin.com/in/${user.linkedinUser}/`)}
            />
            <IconButton
              icon="google"
              color='white'
              size={30}
              onPress={()=> {Linking.openURL("https://accounts.google.c" +
                  "om/signin/v2/challenge/pwd?flowName=GlifWebSignIn&" +
                  "flowEntry=ServiceLogin&cid=1&navigationDirection=forwar" +
                  "d&TL=AM3QAYYdfdc7MiZiXqmE32EqxEymjzvasFAQa0kdh5CXiZ7xalL00wLV0tyZNMw2")
              }}
            />
          </View>
          {
            cohortError ? <Text> No estas asignado a ningún cohorte</Text> :
          <View style={styles.infoCohortWrapper}>
            <View style={styles.infoCohort}>
              <Title style={{color: '#C2C4C9'}}>Cohorte</Title>
              <Caption style={{fontSize: 14, color: '#C2C4C9'}}>{cohort.number}</Caption>
            </View>
            <View style={styles.infoCohort}>
              <Title style={{color: '#C2C4C9'}}>Instructor</Title>
              <Caption style={{fontSize: 14, color:'#C2C4C9'}}>{cohort.instructor_name}</Caption>
            </View>
          </View>
          }
          <Button
            disabled={migration}
            style={{margin:"2%"}}
            icon="swap-horizontal-bold"
            mode="contained"
            onPress={() => navigation.navigate('Migración')}>
            Migrar
          </Button>
          <Button
            style={{margin:"2%", marginTop: '1%'}}
            color='#B2B2B2'
            icon="logout"
            mode="contained"
            onPress={() => userLogout()}>
            Cerrar sesión
          </Button>
        </View>
    </View>
  );
}


export default Profile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  avatar:{
    marginTop: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  name: {
    marginTop: 10,
    alignSelf: 'center',
    color: 'black'
},
  titleInfo:{
    color: 'white',
  },
  caption:{
    alignSelf: 'center',
    color: 'gray',
    marginBottom: 10,
    marginLeft: 3
  },
  infoSection: {
    backgroundColor: Colors.background,
    paddingLeft: 10,
    margin: 10,
    alignSelf: 'center',
    width: '100%',
  },
  infoSectionHeader: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoItems: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10
  },
  icons: {
    color: '#C2C4C9',
    fontSize: 20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textInfo: {
    fontSize: 16,
    marginLeft: 10,
    color: '#C2C4C9'
  },
  ctnTitleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageEdit:{
    position: 'absolute',
    left: 50,
    bottom: -15,
    backgroundColor: '#C7C8C9'
  },
  infoCohortWrapper:{
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: 'white',
    borderTopWidth: 1,
    height: '15%',
    marginBottom: 10
  },
  infoCohort: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

});
