
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

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleMail = (text) => {
    setMail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handlelogin = () => {
    if (!mail || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log(`Email: ${mail}, Password: ${password}`);
    setLogin("");
    setMail("");
    setPassword("");
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <ImageBackground
          source={require("../images/background.jpg")}
          style={styles.imageBackground}
          imageStyle={{
            minHeight: 812,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={styles.formWrap}>
              <Text style={styles.title}>Увійти</Text>
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
              <View></View>

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.5}
                onPress={handlelogin}>
                <Text style={styles.loginButtonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginLink}
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate("Register");
                }}>
                <Text style={styles.loginLinkText}>
                  Немає акаунту? Зареєструватися
                </Text>
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
    position: "relative",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 70,
    
  },

 
  title: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    marginTop: 32,
    color: "#212121",
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
  loginButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  loginButtonText: {
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
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
});

export default LoginScreen;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import React, { useState } from "react";

// const LoginScreen = () => {
// //   const [mail, setMail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [hidePassword, setHidePassword] = useState(true);

// //   const handleMail = (text) => {
// //     setMail(text);
// //   };

// //   const handlePassword = (text) => {
// //     setPassword(text);
// //   };

// //   const login = () => {
// //     if (!mail || !password) {
// //       alert("Please fill in all fields");
// //       return;
// //     }
// //     console.log(`Email: ${mail}, Password: ${password}`);
// //   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS == "ios" ? "padding" : "height"}
//       style={styles.containerKeyBoard}>
//        <View style={styles.container}>
//       <TextInput style={styles.input} placeholder="Адреса електронної пошти" />
//       <TextInput style={styles.input} placeholder="Пароль" />
//       <Pressable style={styles.show}>
//         <Text style={styles.showText}>Показати</Text>
//       </Pressable>
//     </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   containerKeyBoard: {
//     justifyContent: "flex-end",
//   },
//   container: {
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     width: "100%",
//     borderTopRightRadius: 25,
//     borderTopLeftRadius: 25,
//   },
//   photoContainer: {
//     marginTop: -60,
//     height: 120,
//     width: 120,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//   },
//   title: {
//     fontWeight: "500",
//     fontSize: 30,
//     lineHeight: 35,
//     marginTop: 32,
//     color: "#212121",
//   },
//   inputMail: {
//     backgroundColor: "#F6F6F6",
//     width: 343,
//     height: 50,
//     borderRadius: 8,
//     padding: 16,
//     marginTop: 16,
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: 16,
//     position: "relative",
//   },
//   inputPassword: {
//     backgroundColor: "#F6F6F6",
//     width: 343,
//     height: 50,
//     borderRadius: 8,
//     padding: 16,
//     marginTop: 16,
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: 16,
//     position: "relative",
//   },
//   showPasswordText: {
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: 16,
//     lineHeight: 19,
//   },
//   showPassword: {
//     top: -34,
//     left: 130,
//   },
//   loginButton: {
//     backgroundColor: "#FF6C00",
//     height: 50,
//     width: 343,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 100,
//     marginTop: 44,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontWeight: "400",
//   },
//   loginLink: {
//     marginTop: 16,
//     marginBottom: 66,
//   },
//   loginLinkText: {
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: 16,
//     lineHeight: 19,
//   },
// });

// export default LoginScreen;
