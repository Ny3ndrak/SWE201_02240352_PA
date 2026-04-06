import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Hobbies</Text>
      <Text style={styles.text}>
        Hello!! Here I'll share with you a little about my favourite things to do.
      </Text>
      <Button
        title="About Me"
        onPress={() => navigation.navigate('AboutMe')}
      />
    </View>
  );
}

function AboutMeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.hobby}>Drawing: Sketching helps me relax and be creative.</Text>
      <Text style={styles.hobby}>Painting: I love expressing myself through colours and canvas.</Text>
      <Text style={styles.hobby}>Reading: I love reading fictional books.</Text>
      <Text style={styles.hobby}>Baking: I love sweets so I love baking cakes and cookies.</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AboutMe" component={AboutMeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#eaf6ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f4e79',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#010305',
  },
  hobby: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
    color: '#010305',
  },
});