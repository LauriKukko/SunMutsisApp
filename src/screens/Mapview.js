//yleinen karttanäkymä kovakoodatuilla koordinaateilla, vaatii googlen API avaimen ( nyt  (sanna)
import React from 'react';
import {StyleSheet, Text,View}from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class Mapview extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

