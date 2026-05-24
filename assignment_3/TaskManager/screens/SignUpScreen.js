import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { signUp } from '../api/auth';
import { useTaskStore } from '../store/useTaskStore';
import { useForm } from '../hooks/useForm';

export default function SignUpScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const setUser = useTaskStore((s) => s.setUser);
  const { values, errors, setValue, validate } = useForm({
    email: '', password: '', confirmPassword: ''
  });

  const handleSignUp = async () => {
    const valid = validate({
      email: { required: true },
      password: { required: true, min: 4 },
      confirmPassword: { required: true },
    });
    if (!valid) return;

    if (values.password !== values.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await signUp(values);
      setUser(user, token);
    } catch (e) {
      Alert.alert('Sign Up Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={values.email}
        onChangeText={(v) => setValue('email', v)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password (min 4 characters)"
        value={values.password}
        onChangeText={(v) => setValue('password', v)}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm Password"
        value={values.confirmPassword}
        onChangeText={(v) => setValue('confirmPassword', v)}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Create Account</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4F46E5', textAlign: 'center', marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, marginBottom: 4, fontSize: 16 },
  inputError: { borderColor: '#EF4444' },
  error: { color: '#EF4444', fontSize: 12, marginBottom: 8 },
  button: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { color: '#4F46E5', textAlign: 'center', marginTop: 16 },
});