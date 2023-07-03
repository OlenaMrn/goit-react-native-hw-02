import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";


export default function CreatePostsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isLocationFocus, setIsLocationFocus] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoLocation, setPhotoLocation] = useState(null);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const photoLocation = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: photoLocation.coords.latitude,
        longitude: photoLocation.coords.longitude,
      };



      

      setPhotoLocation(coords);
      // Save the photo to the device's file system
      // await FileSystem.copyAsync({
      //   from: photo.uri,
      //   to: FileSystem.documentDirectory + "photo.jpg",
      // });
    }
  };

  const sendPhoto = () => {
    navigation.navigate("Публікації", {
      photo,
      name,
      location,
      ...photoLocation,
    });
    setName("");
    setLocation("");
    setPhoto(null);
    setIsShowKeyboard(false);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            {!isShowKeyboard && (
              <View>
                {hasCameraPermission ? (
                  <Camera style={styles.camera} ref={cameraRef}>
                    <Pressable onPress={takePhoto} style={styles.snapContainer}>
                      <MaterialIcons
                        name="photo-camera"
                        size={24}
                        color="#BDBDBD"
                      />
                    </Pressable>
                  </Camera>
                ) : (
                  <Text>No access to camera</Text>
                )}
                <Text style={styles.text}>Завантажте фото</Text>
              </View>
            )}

            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsNameFocus(true);
              }}
              onBlur={() => setIsNameFocus(false)}
              style={{
                ...styles.input,
                borderBottomColor: isNameFocus ? "#ff6c00" : "#e8e8e8",
                marginTop: 30,
              }}
            />
            <View>
              <Ionicons
                name="ios-location-outline"
                size={24}
                color="#BDBDBD"
                style={{
                  ...styles.locationIcon,
                  color: isLocationFocus ? "#ff6c00" : "#BDBDBD",
                }}
              />
              <TextInput
                value={location}
                onChangeText={(value) => setLocation(value)}
                placeholder="Місцевість..."
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsLocationFocus(true);
                }}
                onBlur={() => setIsLocationFocus(false)}
                style={{
                  ...styles.input,
                  borderBottomColor: isLocationFocus ? "#ff6c00" : "#e8e8e8",
                  marginTop: 30,
                  paddingLeft: 25,
                }}
              />
            </View>
            <Pressable onPress={sendPhoto} style={styles.sendBtn}>
              <Text style={styles.buttonText}>Опублікувати</Text>
            </Pressable>
            <View style={styles.trashIconWrap}>
              <Pressable style={styles.trashButton}>
                <FontAwesome5 name="trash-alt" size={24} color="#DADADA" />
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: "#fff",
  },
  camera: {
    width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  snapContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF4D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Light",
    color: "#BDBDBD",
    lineHeight: 19,
  },
  input: {
    width: "100%",
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    position: "absolute",
    bottom: 7,
  },
  sendBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    fontFamily: "Roboto-Light",
    color: "#FFFFFF",
    fontSize: 16,
  },
  trashButton: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  trashIconWrap: {
    alignItems: "center",
    marginTop: 90,
  },
});
