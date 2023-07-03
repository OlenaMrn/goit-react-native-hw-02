import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
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
import PostsScreen from "./src/screens/PostsScreen";
import Home from "./src/screens/Home";// 
import ProfileScreen from "./src/screens/ProfileScreen";
import CreatePostsScreen from "./src/screens/CreatePostsScreen";
import MapScreen from "./src/screens/MapScreen";
import CommentsScreen from "./src/screens/CommentsScreen";

// const backgroundImage = require("./src/screens/images/background.jpg");

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <MainStack.Screen name="ПУблікаціі" component={PostsScreen} />

        <MainStack.Screen name="Map" component={MapScreen} />

        <MainStack.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Comments" component={CommentsScreen} />

        <MainStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   // backgroundImage: {
//   //   flex: 1,
//   //   justifyContent: "flex-end",
//   //   width: "100%",
//   // },
// });