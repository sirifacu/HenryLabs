import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import divideLecturesByModules from '../../services/divideLecturesByModules';
import UserContext from "../../context/user/UserContext";
import axios from 'axios';
import Modules from '../Modules';
import { ScrollView } from 'react-native-gesture-handler';

const Lectures = () => {
    const { token, userLoggedIn } = useContext(UserContext);
    const [ lectures, setLectures ] = useState([]);

    useEffect(() => {
        axios.get(`/cohorts/user/${userLoggedIn.id}`,
        { headers: {'Authorization': 'Bearer ' + token }})
        .then(res => {
            axios.get(`/lectures/listAll?cohortId=${res.data[0].id}`,
            { headers: {'Authorization': 'Bearer ' + token }})
            .then(response => setLectures(divideLecturesByModules(response.data)));
        })
        .catch(err => console.log(err));
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.title} >
                <Text style={styles.title} >Mis Lectures</Text>
            </View>
            <ScrollView style={styles.modules}>
                {
                    lectures.length 
                    ? lectures.reverse().map((lecture, index) => {
                        return <Modules key={index} index={index} lectures={lecture} />
                    })
                    : <View>
                        <Text>No tienes asignada ninguna clase!</Text>
                    </View>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: StatusBar.currentHeight
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
    },
    scrollView: {
        backgroundColor: 'yellow',
        marginHorizontal: 20,
    },
    modules: {
        paddingTop: StatusBar.currentHeight,
        marginBottom: 40
    },
    accordion: {
        backgroundColor: "yellow",
    },
    listItem: {
        backgroundColor: "yellow",
    }
})

export default Lectures;
