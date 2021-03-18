import axios from 'axios'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import UserContext from "../../context/user/UserContext";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Job from './Job'

const Jobs = ({navigation}) => {
    const { token, userLoggedIn } = useContext(UserContext);
    const [jobs, setJobs] = useState([])

/*     useFocusEffect(() => {
        axios.get('/jobs/list', {headers: {'Authorization': 'Bearer ' + token }}).then(res => setJobs(res.data))
    }); */

    useEffect(() => {
        axios.get('/jobs/list', {headers: {'Authorization': 'Bearer ' + token }})
            .then(res => setJobs(res.data))
    }, [])

    useFocusEffect(
        useCallback(() => {
          const unsubscribe = () => axios.get('/jobs/list', {headers: {'Authorization': 'Bearer ' + token }}).then(res => setJobs(res.data))
          return () => unsubscribe();
        }, [navigation])
      );

    return (
        <View style={styles.container}>
            <View style={styles.title} >
                <Text style={styles.title} >Ofertas de Trabajo</Text>
            </View>
            <ScrollView>
                {
                    jobs.length ? jobs.map((job, index) => 
                    (<Job key={job.id} job={job} />))
                    /* (<Text style={{color: "yellow"}} key={index}>{job.title}</Text>)) */
                    : <View>
                        <Text>No hay trabajos</Text>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 50
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: 'yellow',
    },
    accordion: {
        backgroundColor: "yellow",
    },
    listItem: {
        backgroundColor: "yellow",
    }
})

export default Jobs
