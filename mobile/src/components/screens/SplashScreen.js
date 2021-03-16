import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import logoScreen from '../../../android/app/src/main/assets/yellowPeke.png'


const SplashScreen = () => {
    
    return (
        <View style={styles.container}>
            <View style={styles.ctnLogo}>
                <Animatable.Image
                    animation="flipOutX"
                    duration={2000}
                    source={logoScreen}
                    resizeMode="stretch"
                />
            </View>
        </View>
    )
}

export default SplashScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    ctnLogo :{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
