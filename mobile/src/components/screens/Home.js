import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import UserContext from "../../context/user/UserContext";
import axios from "axios";

const Home = ({ navigation }) => {
    const [ newsAndBooms, setNewsAndBooms ] = useState([]);
    const { token } = useContext(UserContext);

    useEffect(() => {
        axios.get('/news/allNewsAndBooms', { headers: {Authorization: 'Bearer ' + token }})
        .then((res) => {
            const { news } = res.data
            news.forEach(element => {
            element.createdAt = new Date(element.createdAt)
            setNewsAndBooms(news.sort((a, b) => b.createdAt - a.createdAt))
            });
        })
        .catch((err) => console.log(err));
    }, []);


    useFocusEffect(
        useCallback(() => {
          const unsubscribe = () => axios.get('/news/allNewsAndBooms', { headers: {Authorization: 'Bearer ' + token }})
            .then((res) => {
              const { news } = res.data
              news.forEach(element => {
              element.createdAt = new Date(element.createdAt)
              setNewsAndBooms(news.sort((a, b) => b.createdAt - a.createdAt))
              });
            })
            .catch((err) => console.log(err));
          return () => unsubscribe();
        }, [navigation])
      );

    return (
        <View style={styles.homeContainer}>
            <ScrollView>
                {
                    newsAndBooms.map(notice => {
                        return notice.type 
                        ? <Card 
                            key={notice._id} 
                            onPress={() => navigation.navigate("News", { id: notice._id })} 
                            >
                                <Card.Cover source={{ uri: notice.image }} />
                                <Card.Content>
                                    <Title style={styles.title} >{notice.title}</Title>
                                </Card.Content>
                        </Card>
                        : <Card 
                            key={notice._id}
                            onPress={() => navigation.navigate("Booms", { id: notice._id })} >
                            <Card.Content>
                                <Title style={styles.title}>
                                    {`🚀💥 Boom de ${notice.student} 💥 🚀`}
                                </Title>
                                <Paragraph style={styles.paragraph} >
                                    {`Contratado como ${notice.position} en ${notice.company}! (Ver más)`}
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    })
                }
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
    },
    paragraph: {
        color: "yellow",
    },
});

export default Home;
