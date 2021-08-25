import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ebconfig from './ebconfig';
import { EasybaseProvider, useEasybase } from 'easybase-react';

export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Router />
    </EasybaseProvider>
  );
}

function Router() {
  const { isUserSignedIn, signOut } = useEasybase();

  return (
    isUserSignedIn() ? (
      <View style={styles.container}>
        <Text>Congrats! You are signed in.</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    ) : (
      <Account />
    )
  );
}

function Account() {
  const [userVal, setUserVal] = useState('');
  const [passVal, setPassVal] = useState('');

  const { signIn, signUp } = useEasybase();

  const clearInputs = () => {
    setUserVal('');
    setPassVal('');
  };

  const handleSignInPress = async () => {
    console.log('signing in');
    await signIn(userVal, passVal);
    clearInputs();
  };

  const handleSignUpPress = async () => {
    console.log('signing up');
    const res = await signUp(userVal, passVal, {
      created_at: new Date().toString()
    });
    console.log(`res.success: ${res.success}`);
    if (res.success) {
      await signIn(userVal, passVal);
    }
    clearInputs();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native Hello World!</Text>
      <TextInput
        value={userVal}
        onChangeText={e => setUserVal(e)}
        style={styles.accountInput}
        placeholder="Username"
      />
      <TextInput
        value={passVal}
        onChangeText={e => setPassVal(e)}
        style={styles.accountInput}
        placeholder="Password"
      />
      <View style={styles.buttonsWrapper}>
        <Button title="Sign In" onPress={handleSignInPress} />
        <Button title="Sign Up" onPress={handleSignUpPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  accountInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '75%',
    margin: 10,
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
  },
});
