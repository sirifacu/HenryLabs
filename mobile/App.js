import messaging from '@react-native-firebase/messaging';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import 'react-native-gesture-handler';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ButtonBar from './src/components/ButtonBar';
import CompleteProfileAlert from "./src/components/CompleteProfileAlert";
import Login from './src/components/screens/Login';
import { updateRegistrationToken } from './src/components/utils';
import SplashScreen from "./src/components/screens/SplashScreen";
import UserContext from "./src/context/user/UserContext";
import LectureDetails from './src/components/screens/LectureDetails'
import Profile from "./src/components/screens/Profile";
import MigrationForm  from "./src/components/MigrationForm";
import UpdateProfile  from "./src/components/screens/UpdateProfile";
import News from './src/components/screens/News';
import Booms from './src/components/screens/Booms';

// const { Navigator, Screen } = createStackNavigator();

const Stack = createStackNavigator();

const App = () => {
  
  const { token, userLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState("")

  useEffect(()=> {
    if(userLoggedIn.id){
      axios.get(`/users/getAvatar/${userLoggedIn.id}`).then(res => setPhoto(res.data))
    }
  },[userLoggedIn])

  
  useEffect( () => {
    if(userLoggedIn.id){
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body );
      });
  
      const topicSubscriber = messaging().subscribeToTopic(`notificaciones`)
        .then(() => console.log("Estoy suscripto a notificaciones"))
      
      const backgroundHandler = messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log("Notification en Background, " , remoteMessage );
      })
  
      return () => {
        unsubscribe();
        topicSubscriber;
        backgroundHandler;
        };
    }
  }, []);

  useEffect(() => {
    ( async function () {
      const registrationToken = await messaging().getToken()
      if(userLoggedIn.id){
        updateRegistrationToken(userLoggedIn.id, registrationToken);
      }
    })();
  }, [userLoggedIn])
  
  
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  if (isLoading) {
    return <SplashScreen />;
  }
  
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
            height: 70,
            borderBottomWidth: 1, 
            borderColor: "yellow", 
            borderStyle: "solid", 
          },
          headerTintColor: 'yellow',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {token !== null ? userLoggedIn.completeProfile === 'pending' ?
          (<Stack.Screen name="CompleteProfileAlert" component={CompleteProfileAlert}/>)
          :
          (<>
              <Stack.Screen name="Home" component={ButtonBar}
                options={({navigation }) =>  ({ headerTitle: props =>
                  <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  <View>
                    <Image
                        style={styles.image}
                        source={require('./src/assets/blackPeke.png')}
                      />
                  </View>
                  <View style={styles.headerProfile}>
                      
                    <TouchableOpacity
                      style={styles.headerProfile}
                      onPress={() => navigation.push('Perfil')}>
                      <Text style={styles.name}> {userLoggedIn.firstName} </Text>
                      <Avatar.Image style={styles.avatar} size={30} source={{ uri: photo ? photo : null }} />
                    </TouchableOpacity>
                </View>
                </View>,
            })}/>
              <Stack.Screen name="Perfil" component={Profile}/>
              <Stack.Screen name="LectureDetails" component={LectureDetails} options={{title: "Mis clases"}}/>
              <Stack.Screen name="Migración" component={MigrationForm}/>
              <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{title: "Actualizar Perfil"}}/>
              <Stack.Screen name="News" component={News}/>
              <Stack.Screen name="Booms" component={Booms}/>
            </>
          ) : (
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false
          }}/>
          )
        }
      </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  image:{
    width: 200,
    height: 50,
    resizeMode: "contain"
  },  
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  headerProfile:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "1%"
  },
  name: {
    textAlign: "center",
    fontSize: 25,
    color: "white",
    marginRight: 10
	},
	 avatar: {
     backgroundColor: 'transparent',
	}
});

export default App;
