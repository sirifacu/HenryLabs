import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, TextInput, Text, Button, Title, List } from 'react-native-paper';

const Lectures = () => {
    const [ expanded, setExpanded ] = useState(false);

    const handlePress = () => setExpanded(!expanded);

    return (
        <View>
            <View style={styles.title} >
                <Text style={styles.title} >Mis Lectures</Text>
            </View>
            <View>
                <List.Section>
                    <List.Accordion
                        style={styles.accordion}
                        title="Módulo 1"
                        left={props => <List.Icon {...props} icon="folder" />}
                        expanded={expanded}
                        onPress={handlePress}
                    >
                        <List.Item title="Introducción a CS" style={styles.listItem} />
                    </List.Accordion>
                    <List.Accordion
                        title="Módulo 2"
                        left={props => <List.Icon {...props} icon="folder" />}
                    >
                        <List.Item title="JavaScript Avanzado" />
                    </List.Accordion>
                    <List.Accordion
                        title="Módulo 3"
                        left={props => <List.Icon {...props} icon="folder" />}
                    >
                        <List.Item title="Back-End" />
                    </List.Accordion>
                    <List.Accordion
                        title="Módulo 4"
                        left={props => <List.Icon {...props} icon="folder" />}
                    >
                        <List.Item title="Introducción a Bases de Datos" />
                    </List.Accordion>
                </List.Section>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    }
})

export default Lectures;
