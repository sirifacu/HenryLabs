import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

const Booms = ({ route }) => {
    const { student, previousStudies, position, company, country, 
            incomeImprovement, whatYouDidBefore, thanks, comments } = route.params.notice;

    return (
        <View>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title style={styles.title} >{`🚀💥 Boom de ${student} 💥 🚀`}</Title>
                        <Paragraph style={styles.littleDescription} >{`Contratado como ${position} para ${company} en ${country}!`}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Title style={styles.subtitle} >{`${student} nos cuenta un poco de su vida!`}</Title>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`¿Qué estudiabas antes de ingresar en Henry? \n`}</Text>
                            <Text>{previousStudies}</Text>
                        </Paragraph>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`¿Y a qué te dedicabas? \n`}</Text>
                            <Text>{whatYouDidBefore}</Text>
                        </Paragraph>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`¿Se incrementaron tus ganancias con tu nuevo trabajo? \n`}</Text>
                            <Text>{incomeImprovement}</Text>
                        </Paragraph>
                        <Paragraph style={styles.paragraph} >
                            <Text>{`Agradecimientos \n`}</Text>
                            <Text>{thanks}</Text>
                            <Text>{comments}</Text>
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
