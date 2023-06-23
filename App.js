import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";

const backgroundImage = require("./src/screens/images/background.jpg");

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
      <View style={styles.mainContainer}>
        
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}>
        
          <LoginScreen />
        
        
        </ImageBackground>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
});