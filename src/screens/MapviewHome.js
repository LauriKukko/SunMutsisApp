//karttanäkymä Kotisijainnista kovakoodatuilla koordinaateilla, vaatii googlen API avaimen (sanna)
import React from 'react';
import {StyleSheet, Text,View}from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class MapviewWork extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: 60.109470,
                        longitude: 24.442804,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});