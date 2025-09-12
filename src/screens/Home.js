import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import Google from '../assets/Google.png';
import NavBar from '../components/Navbar';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logoImage}
      />

      <Text style={styles.title}>Ótimo dia!</Text>

      <Text style={styles.subtitle}>Como deseja acessar?</Text>

      <TouchableOpacity style={styles.tamanhoTelaButton}>
        <Image
          source={Google}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Acessar com google</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.outlineButton}
        onPress={() => navigation.navigate('Login') }
      >
        <Text style={styles.outlineButtonText}>Email</Text>
      </TouchableOpacity>
      
      <NavBar />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingBottom: 40
  },

  logoImage: {
    width: 250,
    height: 250,
    margin: 15,
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 12,
    marginBottom: 30,
  },

  tamanhoTelaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: '100%', 
    marginBottom: 10,
  },

  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  outlineButton: {
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    width: '100%', 
    alignItems: 'center',
  },

  outlineButtonText: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
  },
});