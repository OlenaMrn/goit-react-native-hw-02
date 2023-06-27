import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./images/background.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.avatar}>
          <Image source={require("./images/User2.jpg")} />
          <Pressable style={styles.avatarButton}>
            <AntDesign name="pluscircleo" size={24} color="#E8E8E8" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.logOutButton}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <Text style={styles.userName}>Natali Romanova</Text>
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
