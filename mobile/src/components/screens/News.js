import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import UserContext from '../../context/user/UserContext';
import axios from 'axios';

const News = ({ route }) => {
    const { id } = route.params;
    const { token } = useContext(UserContext);
    const [ notice, setNotice ] = useState([]);

    useEffect(() => {
        axios.get(`/news/list/${id}`, { headers: { 'Authorization': 'Bearer' + token } })
        .then(res => setNotice(res.data))
        .catch(err => console.log(err));
    }, [id]);

    const handlePress = useCallback(async url => {
        const supported = await Linking.canOpenURL(url);
    
        return supported ? await Linking.openURL(url) : Alert.alert(`Don't know how to open this URL: ${url}`);
    });

    return (
        <View>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title style={styles.title} >
                            { notice.title }
                        </Title>
                        <Title style={styles.subtitle} >
                            { notice.type }
                        </Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: notice.image }} />
                    <Card.Content>
                        <Paragraph style={styles.paragraph} onPress={() => handlePress(notice.link)}>
                            { notice.link }
                        </Paragraph>
                        <Paragraph style={styles.description} >
                            { notice.description }
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
        fontSize: 25,

    },
    subtitle: {
        color: "yellow",
        fontSize: 12,
        marginBottom: '10%',
        textAlign: 'center'
    },
    paragraph: {
        color: "yellow",
        fontSize: 12,
    },
    description: {
        color: "white",
        marginTop: '6%'
    }
});

export default News;
