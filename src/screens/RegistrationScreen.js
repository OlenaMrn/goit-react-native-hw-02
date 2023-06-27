import React, { useState } from "react";
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = (text) => {
    setLogin(text);
  };

  const handleMail = (text) => {
    setMail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
    };
    
  
  const register = () => {
    if (!login || !mail || !password) {
      alert("Please fill in all fields");
      return;
    }
      console.log(`Login: ${login}, Email: ${mail}, Password: ${password}`);
      navigation.navigate("Home");

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <ImageBackground
          source={require("./images/background.jpg")}
          style={styles.imageBackground}
          imageStyle={{
            minHeight: 812,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"  } 
            >
            <View style={styles.container}>
              <View style={styles.photoContainer}>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.inputLogin}
                placeholder="Логін"
                inputMode="text"
                value={login}
                onChangeText={handleLogin}
              />
              <TextInput
                style={styles.inputMail}
                placeholder="Адреса електронної пошти"
                inputMode="email"
                value={mail}
                onChangeText={handleMail}
              />
              <TextInput
                style={styles.inputPassword}
                placeholder="Пароль"
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={handlePassword}
              />
              <TouchableOpacity
                style={styles.showPassword}
                activeOpacity={0.5}
                onPress={() => {
                  setHidePassword(!hidePassword);
                }}>
                <Text style={styles.showPasswordText}>
                  {hidePassword ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.5}
                onPress={register}>
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
