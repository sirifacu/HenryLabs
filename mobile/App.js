import messaging from '@react-native-firebase/messaging';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ButtonBar from './src/components/ButtonBar';
import CompleteProfileAlert from "./src/components/CompleteProfileAlert";
import Login from './src/components/Login';
import { updateRegistrationToken } from './src/components/utils';
import SplashScreen from "./src/components/screens/SplashScreen";
import UserContext from "./src/context/user/UserContext";
import Profile from "./src/components/Profile";

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
        Alert.alert('A new FCM message arrived!', remoteMessage );
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
            height: 70
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
                <View style={styles.headerProfile}>
                  <TouchableOpacity
                    style={styles.headerProfile}
                    onPress={() => navigation.push('Perfil')}>
                    <Text style={styles.name}> {userLoggedIn.firstName} </Text>
                    <Avatar.Image style={styles.avatar} size={40} source={{ uri: photo ? photo : null }} />
                  </TouchableOpacity>
                </View>,
            })}/>
              <Stack.Screen name="Perfil" component={Profile}/>
              {/* <Stack.Screen name="Lectures" component={Lectures}/> */}
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
     backgroundColor: 'white',
	}
});

export default App;
