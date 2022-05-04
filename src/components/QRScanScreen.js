
import React, { Component, useRef, useEffect} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';

import Paho from 'paho-mqtt'; 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {useExamStateStore} from '../states/AllStates';
import {createAlert} from '../helpers/Helpers';
import {DataStreamer} from './DataStreamer';


const scrWidth = Dimensions.get('screen').width;
const scrHeight = Dimensions.get('screen').height;


const  QRScanScreen = props => {
  
  const {updateExamState, upddataateVehicleID, updateTestID, examState, vehicleID,testID, studentID} = useExamStateStore();
  
  // Create an client instance
  var client = new Paho.Client("itrytools.com", Number(9001), "student_app");


    client.onConnectionLost = onConnectionLost;
    // connect the client
    client.connect({
        onSuccess:onConnect,
        onFailure:onFailedConnect,
        userName : "student",
        password : "studentpass"
    });

    client.onMessageDelivered = onMessageDelivered;
    client.onMessageArrived = onMessageArrived;


  ///////// Paho MQTT message handlers
  function onFailedConnect(e) {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Failed to connect - ", e);

  }

  function onMessageDelivered(e) {
    console.log("Message Delivered ", e);

  }
  // called when the client connects
  function onConnect() {
      console.log("onConnect");
      client.subscribe("car0/EXAM");
      

  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
      console.log("Connection to broker lost - ",responseObject);
      if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
      }
  }


    // called when a message arrives
    function onMessageArrived(message) {
 
      if (message.topic == "car0/EXAM") {
          console.log("onMessageArrived:"+message.payloadString);
      }

      else {
          //console.log("Non nav message:"+message.topic);
          //console.log("onMessageArrived:"+message.payloadString);
          
          var newDataPt = JSON.parse(message.payloadString);
          
          }
      }


  function sendMessage(topic, message){
      console.log(`sending ${message} to ${topic}`)
      try {
        mqtt_message = new Paho.Message(message);
        mqtt_message.destinationName = topic;
        console.log(`mqtt_message is ${mqtt_message}`)
        client.send(mqtt_message)
      } catch (error) {
        console.log(`error sending message ${error}`)
      }

      
  }

  ///////////// QR Scanner event handlers

  function onSuccess(e) {
    console.log(`fetched: ${JSON.stringify(e)}`);
    
    if (e) {
      if(e.hasOwnProperty('data')){
        var data_payload = e.data;
        
        try {
          var qr_test_parameters = JSON.parse(data_payload);
          console.log(`testParams [${JSON.stringify(qr_test_parameters)}] , ${qr_test_parameters.hasOwnProperty('testID') } , ${qr_test_parameters.hasOwnProperty('vehicleID') }`);
          if(qr_test_parameters.hasOwnProperty('testID') &&  qr_test_parameters.hasOwnProperty('vehicleID') ){
            var vID = qr_test_parameters.vehicleID;
            var tID = qr_test_parameters.testID;
           
            // updateTestID(tID);
            // updateVehicleID(vID);
            // console.log(`student is: ${studentID}, [${studentID.length}]`);

            // send this to the overseer  with selected userID with a request for TEST_LOGIN(basically face recognition request)
            createAlert("OK", `Pushing test:${tID} car:${vID} for student ${studentID}`);
            var test_start_request = {testID:tID, vehicleID:vID, studentID:studentID};

            sendMessage("car0/EXAM",JSON.stringify(test_start_request));



          } else {
            createAlert("Error", "This Vehicle cannot currently register your test.");
          }
          
        } catch (error) {
          
        }



      }
    }

    

    // var testAPIparams = JSON.parse(e);
    // var testID = testAPIparams.testID;

    /*
      call the testAPI with my ID to initiate the test - this should call the invigilator on itrytools - which should then call the MQTT server on itrytools which 
      the python script (on samrig) is also listening  to itrytools/mqtt , which should request a picture be taken, sent to the CompreFace API on itrytool - if pass, send back a 
      passing message to MQTT on itrytools, else send a failing message back.  
    */

  }

  
    return (
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={3000}
        showMarker={true}

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