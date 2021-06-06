import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Avatar, Caption, Title, IconButton, Text, Button, Divider } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from "../../context/user/UserContext";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Moment from "moment";
import axios from "axios";

const Profile = ( { navigation } ) => {
  const { userLoggedIn, token, userLogout, migration, haveMigration, getUser, userInfo } = useContext(UserContext);
  const [ cohort, setCohort ] = useState({});
  const [ cohortError, setCohortError ] = useState('');
  const [ showMigration, setShowMigration ] = useState('');
  
  
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

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        getUser(userLoggedIn.id)
        getInfoUserCohort(userLoggedIn.id)
      }
      return () => unsubscribe();
    }, [navigation])
  );
  
  useEffect(() => {
    getUser(userLoggedIn.id)
    getInfoUserCohort(userLoggedIn.id)
  }, []);
  
  useEffect(() => {
    haveMigration(userLoggedIn.id)
    setShowMigration(!migration)
  }, [migration]);
  
  
  function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YYYY')
  };

  const getCheckPointState = (number, student) => {
    let state = student[`checkpoint${number}`]
    if(state === null){
      return "No rendiste aun"
    }
    else if(state === "failed"){
      return "Desaprobado"
    }
    else{
      return "Aprobado"
    }
  }
  
 
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.infoSectionHeader}>
          <View>
            <Avatar.Image style={styles.avatar} size={70} source={{uri: userInfo.avatar}} />
            <IconButton
              style={styles.imageEdit}
              icon="pencil"
              color='#47484C'
              size={18}
              onPress={''}
            />
          </View>
          <Title style={styles.name}>{`${userInfo.firstName} ${userInfo.lastName}`}</Title>
          <View style={styles.infoItems}>
            <Icon name="github" style={{fontSize: 20, color: "black"}} />
            <Caption style={styles.caption}>{userInfo.githubUser}</Caption>
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
            <Text style={styles.textInfo} >{userInfo.email}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="cake" style={styles.icons} />
            <Text style={styles.textInfo} >{formatDate(userInfo.dateOfBirth)}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="earth" style={styles.icons} />
            <Text style={styles.textInfo} >{userInfo.country}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="map-marker" style={styles.icons} />
            <Text style={styles.textInfo} >{userInfo.state}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="city" style={styles.icons} />
            <Text style={styles.textInfo} >{userInfo.city}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="home" style={styles.icons} />
            <Text style={styles.textInfo} >{userInfo.address}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="cellphone-android" style={styles.icons} />
            <Text style={styles.textInfo} >{userInfo.cellphone}</Text>
          </View>
          <Divider style={styles.divider}/>
          <View style={styles.ctnTitleCheck}>
            <Title style={styles.titleInfo}>Examenes</Title>
          </View>
          <View style={styles.infoItems}>
            <Icon name="numeric-1-box-multiple-outline" style={styles.icons} />
            <Text style={styles.textInfo} >{getCheckPointState(1,userInfo)}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="numeric-2-box-multiple-outline" style={styles.icons} />
            <Text style={styles.textInfo} >{getCheckPointState(2,userInfo)}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="numeric-3-box-multiple-outline" style={styles.icons} />
            <Text style={styles.textInfo} >{getCheckPointState(3,userInfo)}</Text>
          </View>
          <View style={styles.infoItems}>
            <Icon name="numeric-4-box-multiple-outline" style={styles.icons} />
            <Text style={styles.textInfo} >{getCheckPointState(4,userInfo)}</Text>
          </View>
          <Divider style={styles.divider}/>
          <View style={{flexDirection:'row', alignSelf: 'center'}}>
            <IconButton
              icon="github"
              color='white'
              size={30}
              onPress={()=> Linking.openURL(`https://github.com/${userInfo.githubUser}`)}
            />
            <IconButton
              icon="linkedin"
              color='white'
              size={30}
              onPress={()=> Linking.openURL(`https://www.linkedin.com/in/${userInfo.linkedinUser}/`)}
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
              <Title style={{color: 'yellow'}}>Cohorte</Title>
              <Caption style={{fontSize: 16, color: '#C2C4C9'}}>{cohort.number}</Caption>
            </View>
            <View style={styles.infoCohort}>
              <Title style={{color: 'yellow'}}>Instructor</Title>
              <Caption style={{fontSize: 16, color:'#C2C4C9'}}>{cohort.instructor_name}</Caption>
            </View>
          </View>
          }
          <Button
            disabled={showMigration}
            style={{margin:"2%"}}
            icon="swap-horizontal-bold"
            mode="contained"
            onPress={() => navigation.navigate('Migración')}>
            Migrar
          </Button>
          <Button
            style={{margin:"2%", marginTop: '1%', marginBottom: "10%"}}
            color='#B2B2B2'
            icon="logout"
            mode="contained"
            onPress={() => userLogout()}>
            Cerrar sesión
          </Button>
        </View>
        </ScrollView>
    </View>
  );
}


export default Profile;



const styles = StyleSheet.create({
  divider:{
    backgroundColor: "yellow",
    height: 2
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    color: 'black',
    marginBottom: 10,
    marginLeft: 3
  },
  infoSection: {
    backgroundColor: Colors.background,
    paddingLeft: 10,
    margin: 10,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 20,
  },
  infoSectionHeader: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoItems: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 10
  },
  icons: {
    color: 'yellow',
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
    alignItems: "center",
    justifyContent: 'space-between'
  },
  ctnTitleCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageEdit:{
    position: 'absolute',
    left: 50,
    bottom: -15,
    backgroundColor: '#C7C8C9'
  },
  infoCohortWrapper:{
    flexDirection: 'row',
    borderBottomColor: 'yellow',
    borderBottomWidth: 2,
    borderTopColor: 'yellow',
    borderTopWidth: 2,
    height: '15%',
    marginBottom: 10
  },
  infoCohort: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

});
