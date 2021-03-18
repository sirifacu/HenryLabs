import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert, View, Button, Linking } from 'react-native';
import { Title, Text, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import UserContext from "../../context/user/UserContext";

const OpenURLButton = ({ url, color, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      supported ? await Linking.openURL(url) : Alert.alert(`Don't know how to open this URL: ${url}`);

    }, [url]);
  
    return  <Button title={children} color={color} onPress={handlePress} />;
  };

const FileButton = ({ url, color, children, extension }) => {
    let iconName = "folder-outline";
    if(extension === 'jpg'){
        iconName = "image-outline"
    } else if ( extension === 'png'){
        iconName = "image-outline"
    } else if ( extension === 'jpeg'){
        iconName = "image-outline"
    } else if ( extension === 'rar'){
        iconName = "library-outline"
    } else if ( extension === 'zip'){
        iconName = "library-outline"
    } else if ( extension === 'pdf'){
        iconName = "document-outline"
    }
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      supported ? await Linking.openURL(url) : Alert.alert(`Don't know how to open this URL: ${url}`);

    }, [url]);
  
    return  <Ionicons.Button name={iconName} backgroundColor={color} onPress={handlePress}>
                <Text style={{color: "white"}}>{children}</Text>
            </Ionicons.Button>;
  };

const Separator = () => (
    <View style={style.separator} />
);

const LectureDetail = ({route, navigation}) => {
    const id = route.params.id;
    const { token } = useContext(UserContext);
    const [lecture, setLecture] = useState([]);
    const [files, setFiles] = useState([])

    useEffect(() => {
        axios.get(`/lectures/list/lecture/${id}`, { headers: {Authorization: 'Bearer ' + token} })
        .then(res => setLecture(res.data))
        .then(() => {
            axios.get(`/files/listAll/${id}`, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(res => {
                setFiles(res.data[0].files)
            })
        })
        .catch(e => console.log(e))
    }, [id])

    useFocusEffect(
        useCallback(() => {
          const unsubscribe = () =>  {
                axios.get(`/lectures/list/lecture/${id}`, { headers: {Authorization: 'Bearer ' + token} })
                .then(res => setLecture(res.data))
                .then(() => {
                    axios.get(`/files/listAll/${id}`, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then(res => {
                        setFiles(res.data[0].files)
                    })
                })
                .catch(e => console.log(e))
            }
          return () => unsubscribe();
        }, [navigation])
    );

    return (
        <Card style={style.screenBg}>
            <Card.Content>
                <View style={{ marginTop: '10%',}}>
                    <Title style={style.title}>{lecture.title}</Title>
                    { lecture.description ? (
                        <>
                            <Text style={style.center} >{lecture.description}</Text>
                        </>
                        )
                        : null
                    }
                </View>
                { lecture.videoURL ? (
                    <View style={style.classVideo}>
                        <OpenURLButton url={lecture.videoURL} color={'black'} >Video de la Clase</OpenURLButton>
                    </View>
                ) : null
                }
                <View style={{width: "100%", marginTop: '5%', display: "flex", justifyContent:"center"}}>
                    <Separator />
                </View>
                <View>
                    {
                        files.length ? (
                            <View>
                                <Text style={style.subTitle}>Archivos de la clase</Text>
                                {
                                    files.map(({id, name, url, extension}) => (
                                        <View style={style.viewIconButton} key={id}>
                                            <FileButton style={{width: '80%'}} url={url} color={'black'} extension={extension}>
                                                {name}
                                            </FileButton>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : <Text>Esta clase no tiene archivos asociados</Text> 
                    }
                </View>
            </Card.Content>
        </Card>
    );
};

const style = StyleSheet.create( {
    screenBg: { 
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        marginBottom: '2%',
        width: '95%',
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center' , 
        backgroundColor:"yellow"  
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        marginBottom: '2%'
    },
    subTitle: {
        textAlign: 'center', 
        fontSize: 20,
        marginBottom: '6%'
    },
    center: {
        textAlign: 'center', 
        color: Colors.black
    },
    classVideo: {
        marginTop: '10%', 
        width: '100%', 
        marginRight: 'auto', 
        marginLeft: 'auto'
    },
    viewIconButton: {
        marginBottom: '8%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    separator: {
      width: "100%",
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
});

export default withTheme(LectureDetail);