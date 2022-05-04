import React, { useState, useEffect, useRef, useReducer, useLayoutEffect} from "react";
import Paho from 'paho-mqtt'; 
import {useExamStateStore} from '../states/AllStates'

const DataStreamer = props => {
  
    const {updateExamState, updateVehicleID, updateTestID} = useExamStateStore();

    
    // Create an client instance
    var client = new Paho.Client("itrytools.com", Number(9001), "student_app");
  
    // set callback handlers  
  
    useEffect(() => {
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        // connect the client
        client.connect({
            onSuccess:onConnect,
            onFailure:onFailedConnect,
            userName : "student",
            password : "studentpass"
        });
    
    },[])
  
    function onFailedConnect(e) {
        // Once a connection has been made, make a subscription and send a message.
        console.log("Failed to connect - ", e);
    
    }
    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
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
  
    function sendMessage(topic, message){
        message = new Paho.MQTT.message(message);
        message.destinationName = topic;
        client.send(message)
    }

    // called when a message arrives
    function onMessageArrived(message) {
        
        const deg2rad = degrees => degrees * (Math.PI / 180);
        
        if (message.topic == "car0/EXAM") {
            console.log("onMessageArrived:"+message.payloadString);
        }

        else {
            //console.log("Non nav message:"+message.topic);
            //console.log("onMessageArrived:"+message.payloadString);
            
            var newDataPt = JSON.parse(message.payloadString);
            
            }
        }
    
        return <></>
    }
    
  export default DataStreamer;