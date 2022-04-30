/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import QRScanScreen from './src/QRScanScreen';

const Tab = createBottomTabNavigator();


const scrWidth = Dimensions.get('screen').width;
const scrHeight = Dimensions.get('screen').height;

const userList = [
{id:"anishalex1", name:"Anish Alex", previous_attempts:1, img:require('./assets/img/anish.jpg') },
{id:"bahaaabokharmeh1", name:"Bahaa Abo Kharmeh", previous_attempts:0,img:require('./assets/img/bahaa.jpg') },
{id:"enesredja1", name:"Enes Redja",previous_attempts:0,img:require('./assets/img/enes.jpg') },

]


const  UserCard = item => {
  return(
    <TouchableOpacity style={{flexDirection:"row", marginVertical:5, paddingVertical:10, paddingHorizontal:5, borderColor:"black", borderRadius:15, width:scrWidth*0.9, elevation:1, backgroundColor:"#6495ed"}}>
        <View style={{flex:1.3}}>
          <Image  style={{resizeMode:"cover", borderRadius:20, width:40, height:40}} source={item.img} />
        </View>
        <View style={{flex:7}}>
          <Text>Name: {item.name}</Text>
          <Text>Attempts: {item.previous_attempts}</Text>
        </View>
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <Icon name="chevron-right" size={20} color="gray" />
        </View>          
    </TouchableOpacity>

  )
}


const SignInScreen = props => {

  return(
    <View style={{justifyContent:"center", alignItems:"center", height:scrHeight, width:"100%"}}>
      <QRScanScreen/>
    </View>
  )

}

const HomeScreen = props =>  {
  return (

    <View style={{justifyContent:"center", alignItems:"center", height:scrHeight, width:"100%"}}>       
       <FlatList
         contentContainerStyle={{width:"100%"}}
         data={userList}
         renderItem={({item}) => (<UserCard img={item.img} name={item.name} previous_attempts={item.previous_attempts} />)} 
         keyExtractor={item => item.id}
       />       
    </View>

  )
}

const App = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };





  return (
    <NavigationContainer>

        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator>
          <Tab.Screen name="User" 
                  options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="user" color={"#6495ed"} size={20} />
                    ), }}
          component={HomeScreen} />
          <Tab.Screen name="Exam"
              options={{
                tabBarLabel: 'Exam',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="tachometer-alt" color={"#6495ed"} size={20} />
                ), }}
           component={SignInScreen} />
        </Tab.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
