import {
    Alert,
} from 'react-native';

export function createAlert(title, message) {

  Alert.alert(
    title,
    message,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

}
