import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';

const Modules = ({ navigation, index, lectures }) => {
    const [ expanded, setExpanded ] = useState(false);

    const handlePress = () => setExpanded(!expanded);

    return (
        <ScrollView style={styles.container} >
            <List.Section>
                <List.Accordion
                    style={styles.accordion}
                    title={`Módulo ${index}`}
                    titleStyle={{color: 'black'}}
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={handlePress}
                >
                    {
                        lectures.length 
                        ? lectures.reverse().map(({ title, id }) => 
                            <List.Item
                                left={props => <List.Icon {...props} icon="receipt" />}
                                key={id} 
                                title={title} 
                                style={styles.listItem}
                                onPress={() => navigation.navigate('LectureDetails', { id })}
                            />) 
                        : <View>
                            <Text>No tienes lectures asignadas a este módulo.</Text>
                            </View>
                    }
                </List.Accordion>
            </List.Section>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
    },
    accordion: {
        backgroundColor: "yellow",
    },
    listItem: {
        backgroundColor: "yellow",
        borderTopColor: "black",
        borderStyle: "solid",
        borderRadius: 1,
        borderTopWidth: 2,

    }
})

export default Modules;
