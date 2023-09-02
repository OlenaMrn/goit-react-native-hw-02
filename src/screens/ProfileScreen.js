import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";
import { auth, db } from "../../config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { signOut, onAuthStateChanged } from "firebase/auth";

import { useUser } from "../UserContext";


export default function ProfileScreen({ navigation }) {

const dispatch = useDispatch();
const { userId } = useUser();
const [posts, setPosts] = useState([]);
const [userData, setUserData] = useState([]);

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const user = auth.currentUser;
      setUserData(user);
    }
  });
}, []);

useEffect(() => {
  const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users", userId, "posts"));
      const postsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(postsList);
      return postsList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getDataFromFirestore();
}, []);

const addImage = (e) => {
  e.preventDefault();
};

const handleLogout = async () => {
  await signOut(auth);
  setUserData([]);
  navigation.navigate("Login");
};

const handleLikes = async (postId, postIndex) => {
  try {
    const updatedPosts = [...posts];
    const currentLikes = updatedPosts[postIndex].data.likes;
    const updatedLikes = currentLikes + 1;

    const docRef = doc(collection(db, "users", userId, "posts"), postId);
    await updateDoc(docRef, {
      likes: updatedLikes,
    });

    updatedPosts[postIndex].data.likes = updatedLikes;
    setPosts(updatedPosts);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


  return (
    <View style={styles.container}>
      <Image
        source={require("./images/background.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.avatar}>
          <Image source={require("../screens/images/User2.jpg")} />
          <Pressable style={styles.avatarButton} onPress={addImage}>
            <AntDesign name="pluscircleo" size={24} color="#E8E8E8" />
          </Pressable>
        </View>

        <Pressable onPress={handleLogout} style={styles.logOutButton}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <Text style={styles.userName}>
          {userData.displayName && userData.displayName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
  },
  backgroundImage: {
    position: "absolute",
    width: 411,
    zIndex: -1,
  },
  avatar: {
    position: "absolute",
    left: 147,
    top: -61,
  },
  avatarButton: {
    position: "absolute",
    right: -12,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },

  userName: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 43,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 43,
    position: "relative",
    alignItems: "center",
  },
  logOutButton: {
    marginLeft: "auto",
    marginTop: 22,
  },
});
