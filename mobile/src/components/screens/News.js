import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const News = ({ route }) => {
    const { title, image, description, type, link } = route.params;

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
                            { title }
                        </Title>
                        <Title style={styles.subtitle} >
                            { type }
                        </Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: image }} />
                    <Card.Content>
                        <Paragraph style={styles.paragraph} onPress={() => handlePress(link)}>
                            { link }
                        </Paragraph>
                        <Paragraph style={styles.description} >
                            { description }
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
