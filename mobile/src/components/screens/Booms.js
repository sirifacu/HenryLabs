import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import UserContext from '../../context/user/UserContext';

const Booms = ({ route }) => {
    const { id } = route.params;
    const { token } = useContext(UserContext);
    const [ boom, setBoom ] = useState([]);

    useEffect(() => {
        axios.get(`/booms/list/${id}`, {headers: {'Authorization': 'Bearer' + token }})
        .then(res => setBoom(res.data))
        .catch(err => console.log(err));
    }, [id]);

    return (
        <View>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title style={styles.title} >{`🚀💥 Boom de ${boom.student} 💥 🚀`}</Title>
                        <Paragraph style={styles.littleDescription} >{`Contratado como ${boom.position} para ${boom.company} en ${boom.country}!`}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Title style={styles.subtitle} >{`${boom.student} nos cuenta un poco de su vida!`}</Title>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`¿Qué estudiabas antes de ingresar en Henry? \n`}</Text>
                            <Text>{boom.previousStudies}</Text>
                        </Paragraph>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`¿Y a qué te dedicabas? \n`}</Text>
                            <Text>{boom.whatYouDidBefore}</Text>
                        </Paragraph>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`¿Se incrementaron tus ganancias con tu nuevo trabajo? \n`}</Text>
                            <Text>{boom.incomeImprovement}</Text>
                        </Paragraph>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`Agradecimientos \n`}</Text>
                            <Text>{boom.thanks}</Text>
                            <Text>{boom.comments}</Text>
                        </Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    homeContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' , 
        backgroundColor:"yellow" 
    },
    title: {
        color: "yellow",
        textAlign: 'center',
        fontSize: 21
    },
    littleDescription: {
        color: "yellow",
        marginBottom: '10%'
    },
    subtitle: {
        color: "yellow",
        fontSize: 16
    },
    paragraph: {
        color: "white",
    },
});

export default Booms;
