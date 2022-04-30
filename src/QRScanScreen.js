
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const scrWidth = Dimensions.get('screen').width;
const scrHeight = Dimensions.get('screen').height;


const  QRScanScreen = props => {
  function onSuccess(e) {
    console.log(`fetched: ${JSON.stringify(e)}`);

    testAPIparams = json.parse(e);
    testID = testAPIparams.testID;

    /*
      call the testAPI with my ID to initiate the test - this should call the invigilator on itrytools - which should then call the MQTT server on itrytools which 
      the python script (on samrig) is also listening  to itrytools/mqtt , which should request a picture be taken, sent to the CompreFace API on itrytool - if pass, send back a 
      passing message to MQTT on itrytools, else send a failing message back.  
    */

  }

  
    return (
      <QRCodeScanner
        onRead={onSuccess}

        topContent={
          <Text style={styles.centerText}>
            Scan the QR code in the car
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});


export default QRScanScreen;