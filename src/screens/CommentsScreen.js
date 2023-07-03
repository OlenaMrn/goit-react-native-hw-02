import React, { useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function displayDateTime() {
  const months = [
    "Січня",
    "Лютого",
    "Березня",
    "Квітня",
    "Травня",
    "Лпня",
    "Червня",
    "Серпня",
    "Вересняr",
    "Жовтня",
    "Лютого",
    "Грудня",
  ];

  const now = new Date();
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const dateTimeString = `${date} ${month}, ${year} | ${hours}:${minutes}`;
  return dateTimeString;
}

export default function CommentsScreen({ route }) {
  const postImage = route.params.image;
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const sendComment = () => {
    keyboardHide();
    setComments([
      ...comments,
      { comment: inputValue, date: displayDateTime() },
    ]);
    setInputValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <View style={styles.container}>
            {!isShowKeyboard && (
              <Image source={{ uri: postImage }} style={styles.postImage} />
            )}
            <View style={{ height: isShowKeyboard ? 230 : 280 }}>
              <FlatList
                scrollEnabled={true}
                data={comments}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <View style={styles.commentTextContainer}>
                      <Text style={styles.commentText}>{item.comment}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Image
                      source={require("./images/User3.png")}
                      style={styles.image}
                    />
                  </View>
                )}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                value={inputValue}
                onChangeText={(value) => setInputValue(value)}
                placeholder="Коментувати..."
                placeholderTextColor={"#BDBDBD"}
                style={styles.input}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <Pressable style={styles.sendIcon} onPress={sendComment}>
                <AntDesign name="arrowup" size={14} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  postImage: {
    width: "100%",
    height: 240,
    marginBottom: 20,
    borderRadius: 8,
  },
  input: {
    backgroundColor: "#E8E8E8",
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Light",
  },
  sendIcon: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    position: "absolute",
    right: 8,
    top: 8,
  },
  commentTextContainer: {
    backgroundColor: "#00000008",
    padding: 16,
    width: 320,
  },
  commentText: {
    fontFamily: "Roboto-Light",
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  date: {
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
  },
});
