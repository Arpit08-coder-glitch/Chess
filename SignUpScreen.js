import React, { useState } from 'react';
import { TextInput, Button, Text, View, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Toast from 'react-native-toast-message'; // Import Toast
import { auth } from './firebase'; // Import the Firebase auth instance

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Send email verification
        sendEmailVerification(user)
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Verification email sent',
              text2: 'Please verify your email to proceed.',
            });

            const interval = setInterval(() => {
              user.reload().then(() => {
                if (user.emailVerified) {
                  clearInterval(interval);
                  Toast.show({
                    type: 'success',
                    text1: 'Email Verified',
                    text2: 'You can now log in.',
                  });
                  navigation.navigate('Login');
                }
              });
            }, 5000); // Check every 5 seconds
          })
          .catch((error) => {
            setErrorMessage('Failed to send verification email.');
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Failed to send verification email.',
            });
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log in
      </Text>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
  },
});

export default SignUpScreen;
