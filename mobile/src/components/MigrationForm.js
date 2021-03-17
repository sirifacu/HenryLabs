import React, {useContext} from 'react';
import { Modal, Title, Text, Button, Card, TextInput } from 'react-native-paper';
import {Alert, StyleSheet, View} from 'react-native';
import {useEffect, useState} from "react";
import UserContext from "../context/user/UserContext";
import axios from "axios";
import {validatePass} from "./utils";
import {USER_LOGIN_FAIL} from "../context/actions";




export const MigrationForm = ( {navigation} ) => {
  const { userLoggedIn, token, userLogout } = useContext(UserContext);
  // const [ integrateDate, setIntegratedDate ] = useState('');
  const [ migrationReason, setMigrationReason ] = useState('');
  const [ migrationDate, setMigrationDate ] = useState('');
  
  const showAlertMigrationSuccess = () =>{
    Alert.alert(
      "Success",
      "Solicitud enviada",
      [
        { text: "OK", onPress: () => {
            navigation.navigate('Perfil')
          }}
      ]
    );
  }
  const handleSubmit = async () => {
    if(migrationDate && migrationReason){
    axios.post(`migrations/createRequest/user/${userLoggedIn.id}`,
      { reason: migrationReason, wishedStartingDate: migrationDate },
      { headers: {'Authorization': 'Bearer ' + token }})
      .then((res) => {
        console.log('submit', res.data)
        showAlertMigrationSuccess();
      })
      .catch(err => console.log(err));
    }
  };
  
  const handleReasonChange = async (event) =>{
    event.persist();
   const reason = await event.nativeEvent.text;
    setMigrationReason(reason)
  };
  const handleDateChange = async (event) =>{
    event.persist();
    const date = await event.nativeEvent.text;
    setMigrationDate(date)
  }
  
  
  return (
    <Card style={styles.container}>
      <Card.Content style={styles.card}>
        <Title style={{color:'yellow', alignSelf:'center'}}>Migración</Title>
          <TextInput
            mode="outlined"
            style={styles.textArea}
            placeholder="Motivo *"
            placeholderTextColor="grey"
            numberOfLines={5}
            multiline={true}
            value={migrationReason}
            onChange={handleReasonChange}
          />
          <TextInput
            mode="outlined"
            style={styles.date}
            placeholder="fecha"
            placeholderTextColor="grey"
            value={migrationDate}
            onChange={handleDateChange}
          />
          <View style={styles.buttonWrapper}>
            <Button
              style={styles.button}
              color='#B2B2B2'
              icon="cancel"
              mode="contained"
              onPress={() => navigation.navigate('Perfil')}>
              Cancelar
            </Button>
            <Button
              style={styles.button}
              color='#B2B2B2'
              icon="send"
              mode="contained"
              onPress={handleSubmit}>
              Enviar
            </Button>
            
          </View>
        
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textArea: {
    backgroundColor: 'white',
  },
  date: {
    backgroundColor: 'white',
    marginTop: '2%'
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width: '48%',
    margin: '2%',
    marginTop: '4%',
  },
  card: {
    backgroundColor: 'black',
    margin: 10,
    marginTop: '30%'
  }
})

// export const App = () => {
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };
//
//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };
//
//   const showDatepicker = () => {
//     showMode('date');
//   };
//
//   const showTimepicker = () => {
//     showMode('time');
//   };
//
//   return (
//     <View>
//       <View>
//         <Button onPress={showDatepicker} title="Show date picker!"/>
//       </View>
//       <View>
//         <Button onPress={showTimepicker} title="Show time picker!"/>
//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// }
