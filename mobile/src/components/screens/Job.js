import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';

const Job = ({job}) => {
    moment.locale('es')  
    return (
        <Card style={styles.container}>
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
