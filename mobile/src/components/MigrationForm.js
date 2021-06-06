import React, { useContext, useState } from 'react';
import { Title, Button, Card, TextInput, HelperText } from 'react-native-paper';
import { Alert, StyleSheet, View } from 'react-native';
import UserContext from "../context/user/UserContext";
import DatePicker from 'react-native-date-picker'
import { Colors } from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import {ScrollView} from "react-native-gesture-handler";


const MigrationForm = ( {navigation} ) => {
  const { userLoggedIn, token, haveMigration } = useContext(UserContext);
  const [ migrationReason, setMigrationReason ] = useState('');
  //const [ migrationDate, setMigrationDate ] = useState('');
  const [text, setText] = useState('');
  const [migrationDate, setMigrationDate] = useState(new Date())
  
  const showAlertMigrationSuccess = () =>{
    Alert.alert(
      "Hecho!",
      "Solicitud enviada",
      [
        { text: "OK", onPress: () => {
            haveMigration(userLoggedIn.id)
            navigation.navigate('Perfil')
          }}
      ]
    );
  };
  
  const handleSubmit = async () => {
    if(migrationDate && migrationReason){
    axios.post(`migrations/createRequest/user/${userLoggedIn.id}`,
      { reason: migrationReason, wishedStartingDate: migrationDate },
      { headers: {'Authorization': 'Bearer ' + token }})
      .then(() => {
        showAlertMigrationSuccess()
      }).catch(err => console.log(err));
    }
  };
  
  const handleReasonChange = (event) =>{
   const reason = event.nativeEvent.text;
    setMigrationReason(reason)
    setText(reason)
  };
  
  const handleDateChange = (event) =>{
    const date = event.nativeEvent.text;
    setMigrationDate(date)
  };
  
  
  return (
    <Card style={styles.container}>
      <ScrollView>
        <Card.Content style={styles.card}>
          <Title style={{color:'black', alignSelf:'center'}}>Migración</Title>
            <TextInput
              required
              mode="outlined"
              style={styles.textArea}
              placeholder="Motivo *"
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
              value={migrationReason}
              onChange={handleReasonChange}
            />
            <HelperText type="error" visible={!text.length}>
              El motivo es requerido
            </HelperText>
            <DatePicker
              date={migrationDate}
              onDateChange={setMigrationDate}
              androidVariant="nativeAndroid"
              mode="date"
            />
            {/* <TextInput
              mode="outlined"
              style={styles.date}
              placeholder="fecha"
              placeholderTextColor="grey"
              value={migrationDate}
              onChange={handleDateChange}
            /> */}
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
                Enviar
              </Button>
            </View>
        </Card.Content>
    </ScrollView>
    </Card>
  );
};
export default MigrationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  textArea: {
    backgroundColor: 'white',
  },
  date: {
    backgroundColor: 'white',
    height: 40,
    marginTop: -5
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
    backgroundColor: Colors.light,
    margin: 10,
    marginTop: '30%',
    borderRadius: 10
  }
})
