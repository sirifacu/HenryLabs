import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const AppBar = () => (
 <Appbar style={styles.bottom}>
   <Appbar.Action
     icon="archive"
     onPress={() => console.log('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar>
 );

 const styles = StyleSheet.create({
   bottom: {
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
   },
 });

export default AppBar
