import React, {useContext, useEffect, useState} from 'react';
import {Title, Button, TextInput} from 'react-native-paper';
import {StyleSheet, View } from 'react-native';
import UserContext from "../../context/user/UserContext";
import {Colors} from "react-native/Libraries/NewAppScreen";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const UpdateProfile = ( {navigation} ) => {
  const { userLoggedIn, getUser, userInfo, updateUser} = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    cellphone: "",
    githubUser: "",
    googleUser: "",
    linkedinUser: "",
  });
  
  const showAlertUpdateSuccess = () =>{
    Alert.alert(
      "Hecho!",
      "Los datos se actualizaron correctamente",
      [
        { text: "OK", onPress: () => {
            navigation.navigate('Perfil')
          }}
      ]
    );
  }
  
  const handleSubmit = async () => {
    updateUser(userLoggedIn.id, userData)
    showAlertUpdateSuccess()
  };
  
  const handleChange = async (event, inputName) => {
    setUserData({...userData,
      [inputName]: event.nativeEvent.text
    });
  };
  
  useEffect(() => {
    getUser(userLoggedIn.id)
  }, [])
  
  useEffect(() => {
    if(userInfo.id){
      setUserData({
        email: userInfo.email || "",
        address: userInfo.address || "",
        city: userInfo.city || "",
        state: userInfo.state || "",
        country: userInfo.country || "",
        cellphone: userInfo.cellphone || "",
        githubUser: userInfo.githubUser || "",
        googleUser: userInfo.googleUser || "",
        linkedinUser: userInfo.linkedinUser || ""
      })
    }
  },[userInfo])
  
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ctnInputs}>
          <Title style={{color:'black', alignSelf:'center'}}>Actualizar Perfil</Title>
          <View style={styles.inputsWrapper} >
            <View style={styles.pairInputs}>
              <TextInput
                required
                mode="outlined"
                style={styles.input}
                label='Email'
                placeholder="Email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.email}
                onChange={(e) => handleChange(e, 'email')}
              />
              <TextInput
                required
                mode="outlined"
                label='País'
                style={styles.input}
                placeholder="País"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.country}
                onChange={(e) => handleChange(e, 'country')}
              />
            </View>
          
          </View >
          <View style={styles.inputsWrapper} >
            <View style={styles.pairInputs}>
              <TextInput
                required
                mode="outlined"
                label='Dirección'
                style={styles.input}
                placeholder="Dirección"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.address}
                onChange={(e) => handleChange(e, 'address')}
              />
              <TextInput
                required
                mode="outlined"
                label='Ciudad'
                style={styles.input}
                placeholder="Ciudad"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.city}
                onChange={(e) => handleChange(e, 'city')}
              />
            </View>
          </View >
          <View style={styles.inputsWrapper} >
            <View style={styles.pairInputs}>
              <TextInput
                required
                mode="outlined"
                label='Provincia/Estado'
                style={styles.input}
                placeholder="Provincia/Estado"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.state}
                onChange={(e) => handleChange(e, 'state')}
              />
              <TextInput
                required
                mode="outlined"
                label='Teléfono/Celular'
                style={styles.input}
                placeholder="Teléfono/Celular"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.cellphone}
                onChange={(e) => handleChange(e, 'cellphone')}
              />
            </View>
          </View >
          <View style={styles.inputsWrapper} >
            <View style={styles.pairInputs}>
              <TextInput
                required
                mode="outlined"
                label='Linkedin'
                style={styles.input}
                placeholder="Linkedin"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.linkedinUser}
                onChange={(e) => handleChange(e, 'linkedinUser')}
              />
              <TextInput
                required
                mode="outlined"
                label='Github'
                style={styles.input}
                placeholder="Github"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={userData.githubUser}
                onChange={(e) => handleChange(e, 'githubUser')}
              />
            </View>
    
          </View >
          <TextInput
            required
            mode="outlined"
            label='Google/Gmail'
            style={styles.input}
            placeholder="Google"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={userData.googleUser}
            onChange={(e) => handleChange(e, 'google')}
          />
    
          <View style={styles.buttonWrapper}>
            <Button
              style={styles.button}
              color={Colors.accent}
              icon="cancel"
              mode="contained"
              onPress={() => navigation.navigate('Perfil')}>
              Cancelar
            </Button>
            <Button
              style={styles.button}
              color={Colors.accent}
              icon="send"
              mode="contained"
              onPress={handleSubmit}>
              Actualizar
            </Button>
    
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ctnInputs: {
    backgroundColor: Colors.light,
    alignSelf: 'center',
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: '20%'
  },
  inputsWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  },
  pairInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.white,
    margin: 3,
    width: '47%',
    height: 40,
    fontSize: 14
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width: '45%',
    margin: '1%',
    marginTop: '4%',
  },

})
