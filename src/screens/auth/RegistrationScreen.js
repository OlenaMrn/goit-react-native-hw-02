import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,

} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/authOperations";

import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../../config";
import {
  registerDB,
  writeUserToFirestore,
} from "../../redux/services/userService";

import { useUser, userId } from "../../UserContext";

const initialState = {
  email: "",
  password: "",
  login: "",
};



const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
   const [focusedInput, setFocusedInput] = useState(null);
 const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
 const [isLoginFocus, setIsLoginFocus] = useState(false);
 const [isEmailFocus, setIsEmailFocus] = useState(false);
 const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { setUser } = useUser();


const dispatch = useDispatch();

   useEffect(() => {
     setIsFormValid(login !== "" && email && password);
   }, [login, email, password]);

   const addImage = (e) => {
     e.preventDefault();
  };
  
   useEffect(() => {
     onAuthStateChanged(auth, (user) => {
       if (user) {
         navigation.navigate("Home");
         setLogin("");
         setEmail("");
         setPassword("");
       }
     });
   }, []);
  

   const keyboardHide = () => {
     setIsShowKeyboard(false);
     Keyboard.dismiss();
   };

  const handleSignIn = async () => {
    if (isFormValid) {
      await registerDB(email, password);
      updateProfile(auth.currentUser, {
        displayName: login,
      });
      const id = await writeUserToFirestore(login, email, password);
      setUser(id);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.page}>
        <ImageBackground
          source={require("../images/background.jpg")}
          style={styles.imageBackground}
          imageStyle={{
            minHeight: 812,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={styles.container}>
              <View style={styles.photoContainer}>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.inputLogin}
                inputMode="text"
                placeholder="Логін"
                name="login"
                value={login}
                onChangeText={(text) => {
                  setLogin(text);
                }}
                onFocus={() => setFocusedInput("login")}
                onBlur={() => setFocusedInput(null)}
              />
              <TextInput
                style={styles.inputMail}
                placeholder="Адреса електронної пошти"
                inputMode="email"
                name="email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text.trim());
                }}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
              <TextInput
                style={styles.inputPassword}
                placeholder="Пароль"
                name="password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <Pressable
                onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                style={styles.toggleButton}>
                <Text style={styles.toggleText}>
                  {isPasswordHidden ? "Показати" : "Приховати"}
                </Text>
              </Pressable>

              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.5}
                onPress={handleSignIn}>
                <Text style={styles.registerButtonText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginLink}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );

};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    minHeight: 549,
    justifyContent: "flex-end",
    
  },

  formWrap: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 70,
    marginBottom: 16,
    position: "relative",
    alignItems: "center",
  },

  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  addButton: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    color: "#212121",
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  inputMail: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  inputPassword: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  showPasswordText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,    
  },
  showPassword: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default RegistrationScreen;
