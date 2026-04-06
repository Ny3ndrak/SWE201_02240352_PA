import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Hobbies</Text>
      <Text style={styles.text}>
        Hello!!
        Here I'll share with you a little about my favourite things to do.
      </Text>

      <Link href="/about" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}> About Me</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#eaf6ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f4e79",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#010305",
  },
  button: {
    backgroundColor: "#78b7e8",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
});