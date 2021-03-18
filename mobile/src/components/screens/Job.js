import React, {useCallback} from 'react'
import { StyleSheet, Text, View, Linking, Alert } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import moment from 'moment';
import {CLIENT_URL} from '../../../config'

const Job = ({job}) => {
    moment.locale('es') 
    
    const handlePress = useCallback(async (url) => {
        const supported = await Linking.canOpenURL(url);
    
        return supported ? await Linking.openURL(url) : Alert.alert(`Don't know how to open this URL: ${url}`);
  
    }, []);
    
    return (
        <Card style={styles.container} onPress={() => handlePress(`http://${CLIENT_URL}/panel/lista-trabajos/${job.id}`)}>
            <Card.Content>
                    <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
                        <Title>{job.title}</Title>
                        <Paragraph>
                        ${job.salary}
                        </Paragraph>
                    </View>
                    <View style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                        <Paragraph>{job.contract } | {job.type}</Paragraph>
                        <Paragraph>
                        {moment(job.createdAt).subtract(1, 'days').calendar()}
                        </Paragraph>
                    </View>
            </Card.Content>
        </Card>
    )
}

export default Job

const styles = StyleSheet.create({
    container: {
        backgroundColor: "yellow",
        margin: 5,
    }
})
